<?php
    use Tstuff\Context;
    use Tstuff\Tapi\ApiException;
    use Tstuff\Tapi\TApiService;

$this->action('test/test', function ($r){

    TApiService::requiredInput($r,['a','b']);

    $a = TApiService::getInput($r,'a');
    $b = TApiService::getInput($r,'b');
    
    return array('ais'=>$a, 'bis'=>$b);

});