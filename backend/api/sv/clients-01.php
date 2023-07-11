<?php
require_once('../classes/clients.classes.php');
require_once('../classes/response.classes.php');
include_once('./apiutil.php');

$clients = new Clients();
$requestMethod = $_SERVER["REQUEST_METHOD"];
if ($requestMethod == 'GET'):
  echo $requestMethod;
  try {
    $res = $clients->getAll();
    $response = array( "data" => $res );
    Response::success($response);
  }
  catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
  }
elseif ($requestMethod == 'POST'):
  echo ("Member post");
endif;

