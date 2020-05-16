<?php

namespace Tstuff\Tapi;

use Exception;
use mysqli;
use Tstuff\Context;
use Tstuff\log\TLog;

class TApiService
{

    private $baseFolder;
    private static $db;
    private $log;

    private $pathToAction = array();
    private $pathToActionInclude = array();

    public function __construct(string $baseFolder, mysqli $db, TLog $log)
    {
        self::$db = $db;
        $this->log = $log;
        $this->baseFolder = strtolower($baseFolder);
    }

    public function action($path, $callback)
    {
        $this->pathToAction[$path] = $callback;
    }

    public function actionInclude($path, $file)
    {
        $this->actionInclude[$path] = $file;
    }

    public static function inputExists($request, $key) {
        if($request['input'] == null) return false;
        return array_key_exists($key,$request['input']);
    }

    public static function getInput($request, $key) {
        return mysqli_real_escape_string(self::$db,self::inputExists($request, $key) ? $request['input'][$key] : null);
    }

    private function setHeader()
    {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=utf-8");
        header("Access-Control-Max-Age: 200");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    }

    private function getApiPath()
    {
        return str_replace($this->baseFolder, "", strtolower($_SERVER['REQUEST_URI']));
    }

    private function parseRequest()
    {
        $splitParams = explode("?", $this->getApiPath());
        $pathArr = explode("/", $splitParams[0]);
        $params = array();
        //URL Get Param Parser
        if (isset($splitParams[1])) {
            $keyValueString = explode("&", $splitParams[1]);

            foreach ($keyValueString as  $value) {
                $t = explode("=", $value, 2);
                if ($t[0] == "") continue;
                $params[$t[0]] = $t[1] ?? "";
            }
        }

        return array(
            'input' => json_decode(file_get_contents('php://input'), true),
            'path_array' => $pathArr,
            'path' => explode('?', $this->getApiPath(), 2)[0],
            'url_param' => $params

        );
    }

    public static function showResponse(int $state, $data)
    {
        echo json_encode(array('state' => $state, 'data' => $data));
    }

    public function Run()
    {

        #slim version only use post
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') return false;
        $this->setHeader();
        $request = $this->parseRequest();
       
        $this->log->dbg('server','TAPI/REQUEST',"Request started;Path=".$request['path'].";Input:".json_encode($request['input']));
        if (isset($this->actionInclude[$request['path_array'][0]])) {
            include 'ctrl/' . $this->actionInclude[$request['path_array'][0]] . '.php';
        }
        
        if (isset($this->pathToAction[$request['path']])) {
            try{
                self::showResponse(1, $this->pathToAction[$request['path']]($request));
            } catch(ApiException $ex){
                self::showResponse(3, $ex->getResponse()); 
                $this->log->err('server','TAPI/ApiException',json_encode($ex->getResponse()));
            }
            catch(Exception $ex) {
                self::showResponse(2,array('exception' => array('message' => $ex->getMessage(), 'file' => $ex->getFile(), 'line' => $ex->getLine(), 'trace' => $ex->getTrace())));
                $this->log->err('server','TAPI/Exception',json_encode(array('exception' => array('message' => $ex->getMessage(), 'file' => $ex->getFile(), 'line' => $ex->getLine(), 'trace' => $ex->getTrace()))));
            }
        } else {
            self::showResponse(0, null);
        }

        return true;
    }
}
