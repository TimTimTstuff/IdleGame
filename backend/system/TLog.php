<?php
namespace Tstuff\log;

use Exception;
define('TLOG_LEVEL_DEBUG',9999);
define("TLOG_LEVEL_INFO",1);
define("TLOG_LEVEL_ERROR",0);

class TLog {


    private $db;
    private $username;
    private $level;

    /**
     * Undocumented function
     *
     * @param mysqli $db
     */
    public function __construct($db, $username, $level = TLOG_LEVEL_ERROR)
    {
       $this->db = $db;
       $this->username = $username; 
       $this->level = $level;
    }

    public function log($origin, $path, $msg, $lvl) {
        $query = "INSERT INTO ". TABLE_LOG ." ( `dateOn`, `user`, `origin`, `path`, `msg`, `lvl`) 
        VALUES 
        ('".date("Y-m-d H:i:s")."','".$this->username."','$origin','$path','".mysqli_real_escape_string($this->db, $msg)."','$lvl')";

        $result = mysqli_query($this->db, $query);

        if($result == false) throw new Exception("Error on Log create!");
    }

    public function err($origin, $path, $msg) {
        if($this->level < 0) return;
        $this->log($origin,$path,$msg,'error');
    }

    public function inf($origin, $path, $msg) {
        if($this->level < 1) return;
        $this->log($origin,$path,$msg,'info');
    }

    public function dbg($origin, $path, $msg) {
        if($this->level < 2) return;
        $this->log($origin,$path,$msg,'debug');
    }

}