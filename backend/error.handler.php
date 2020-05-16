<?php

use Tstuff\Context;

function exception_handler($exception)
{


    if (get_class($exception) == 'ApiException') {
        echo json_encode(['type' => 'exception', 'message' => $exception->getMessage(), 'requestinfo' => $exception->getRequest()], JSON_PRETTY_PRINT);
    } else {
        
        echo json_encode(['type' => 'exception', 'type_class' => get_class($exception), 'message' => $exception->getMessage(), 'trace' => json_encode($exception->getTrace())], JSON_PRETTY_PRINT);
        Context::$log->err("server", "exception_handler",json_encode(['type' => 'exception', 'type_class' => get_class($exception), 'message' => $exception->getMessage()], JSON_PRETTY_PRINT));
    }
}

function error_handler($error_level, $error_message, $error_file, $error_line, $error_context)
{
    $error = 'lvl: ' . $error_level . ' | msg:' . $error_message . ' | file:' . $error_file . ' | ln:' . $error_line;
   
    echo json_encode(['error' => $error], JSON_PRETTY_PRINT);
    Context::$log->err("server", "error_handler",json_encode(['error' => $error], JSON_PRETTY_PRINT));
}

function shutdownHandler()
{
    $lasterror = error_get_last();

    if(!is_array($lasterror)){
        return;
    }
    
    switch ($lasterror['type']) {
        case E_ERROR:
        case E_CORE_ERROR:
        case E_COMPILE_ERROR:
        case E_USER_ERROR:
        case E_RECOVERABLE_ERROR:
        case E_CORE_WARNING:
        case E_COMPILE_WARNING:
        case E_PARSE:
            $error = '[SHUTDOWN] lvl:' . $lasterror['type'] . ' | msg:' . $lasterror['message'] . ' | file:' . $lasterror['file'] . ' | ln:' . $lasterror['line'];
            echo json_encode(['error' => $error], JSON_PRETTY_PRINT);        
            Context::$log->err("server", "error_handler",json_encode(['error' => $error], JSON_PRETTY_PRINT));
    }
}

set_exception_handler('exception_handler');
set_error_handler('error_handler', E_ALL);
register_shutdown_function('shutdownHandler');
