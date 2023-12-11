<?php
require_once('../classes/sessions.classes.php');
require_once('../classes/response.classes.php');
include_once('./apiutil.php');

$sessions = new Sessions();

$requestMethod = $_SERVER["REQUEST_METHOD"];
$pathParams = getPathParam();
if ($requestMethod == 'GET'):
  $clientId  = empty($pathParams) ? "" : $pathParams[0];
  if ($clientId != ""):
    $res = $sessions->getByClientId( $clientId );
    $response = array( "data" => $res );
    Response::success($response);
  else:
    Response::error("Missing client id");
  endif;
endif;
