<?php
require_once '../classes/response.classes.php';
include_once('./apiutil.php');

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod == 'GET'):
  $response = array( "data" => "Hello from stock-management API" );
  Response::success($response);
endif;



