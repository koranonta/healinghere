<?php
require_once('../classes/clients.classes-org.php');
require_once('../classes/response.classes.php');
include_once('./apiutil.php');

$clients = new Clients();
$requestMethod = $_SERVER["REQUEST_METHOD"];
if ($requestMethod == 'GET'):
  try {
    $id = getId();
    $name = getParam('name');
    echo $id, $name;
    if ($id):
      $res = $clients->getById($id);
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

