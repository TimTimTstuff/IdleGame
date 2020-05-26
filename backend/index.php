<?php
include 'context.php';
include '../config.php';

include 'system/slimtapi/Tapi.php';
include 'system/slimtapi/apiexception.php';
include 'system/TLog.php';
include 'error.handler.php';

use Tstuff\Context;
use Tstuff\log\TLog;
use Tstuff\Tapi\TApiService;
session_start();

if(!isset($_SESSION['userid'])) {
    $_SESSION['userid'] = -1;
}

Context::$db = mysqli_connect(SQL_HOST, SQL_USER, SQL_PASSWORD, SQL_DATABASE);
Context::$log = new TLog(Context::$db, "unknown");

if (!mysqli_set_charset(Context::$db, "utf8")) {
    printf("Error loading character set utf8: %s\n", mysqli_error($link));
    exit();
} 

$api = new TApiService(APP_SERVER_URL, Context::$db,Context::$log);
$api->actionInclude('test','test');
$api->Run();
