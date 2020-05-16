<?php

namespace Tstuff\Tapi;

use Exception;
define('API_EXCEPTION_MISSING_PARAM', 0);
define('API_EXCEPTION_SQL_ERROR', 1);
define('API_EXCEPTION_RESULT_NOT_FOUND', 2);

class ApiException extends Exception {
    private $exceptionType;
    private $request;

    public function __construct(string $message, string $type, array $request)
    {
        $this->request = $request;
        $this->exceptionType = $type;
        parent::__construct($message);
    }

    public function getType() {
        return $this->exceptionType;
    }

    public function getResponse() {
        return array('type' => $this->exceptionType, 'message' => $this->message, 'request' => $this->request, 'stacktrace' => $this->getTrace());
    }

}