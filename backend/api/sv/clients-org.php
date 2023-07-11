<?php
require_once('../classes/clients.classes.php');
require_once('../classes/response.classes.php');
include_once('./apiutil.php');

$clients = new Clients();
$requestMethod = $_SERVER["REQUEST_METHOD"];
if ($requestMethod == 'GET'):
  try {
    $id = getId();
    $name = getParam('name');
    echo $id;
    echo $name;
    if ($id):
      $res = $clients->getById($id);
      $response = array( "data" => $res );
      Response::success($response);
    elseif (isset($name)):
      $res = $clients->getByName($name);
      $response = array( "data" => $res );
      Response::success($response);    
    else:
      $res = $clients->getAll();
      $response = array( "data" => $res );
      Response::success($response);
    endif;
  }
  catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
  }  
elseif ($requestMethod == 'POST'):
  echo ("Member post");
endif;

