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
      echo "In seach by id ${$id}";
      $res = $clients->getById($id);
      $response = array( "data" => $res );
      Response::success($response);
    elseif (isset($name)):
      echo "In seach by name ${mame}";
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




/*
require_once('../classes/clients.classes.php');
require_once('../classes/response.classes.php');
include_once('./apiutil.php');
//require_once '../classes/imagehandler.classes.php';

echo "before";

$clients = new Clients();
//$imgHandler = new ImageHandler("/app/vss/backend/assets/images/avatars/");

echo "after";



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
  //$img = $_FILES['imgInput'];
  //$imgName = isset($img) ? $img['name'] : $_POST['image'];

  $client = array(
    'clientname' => $_POST['clientname']
   ,'username'   => $_POST['username']
   ,'emailaddress'=> $_POST['emailaddress']
   ,'lastactive' => $_POST['lastactive']
   ,'signup'     => $_POST['signup']
   ,'orders'     => $_POST['orders']
   ,'totalspend' => $_POST['totalspend']
   ,'aov'        => $_POST['aov']
   ,'country'    => $_POST['country']
   ,'city'       => $_POST['city']
   ,'region'     => $_POST['region']
   ,'postcode'   => $_POST['postcode']
   ,'loginid'    => -1
  );
  
  $id = $_POST['clientid'];
  if (isset($id)):
    $client['clientid'] = $id;
    $res    = $clients->update($client);
    $okMsg  = 'Client id [ ' . $id . ' ] updated';
    $errMsg = 'Unable to update Client id [ ' . $id . ' ]';
  else:
    $res    = $clients->add($client);
    $okMsg  = 'New client added';
    $errMsg = 'Unable to add client';
  endif;

  if ($res):
    $response = array( 'res' => $okMsg, 'client' => $res );
    Response::success($response);
  else:
    Response::error($errMsg);
  endif;

  //  Save image
  //if (isset($img['name']) && $img['error'] == 0):
  //  $imgHandler->saveImage($img);
  //endif;
elseif ($requestMethod == 'DELETE'):
  $id = getId();
  if ($id):
    $res = $clients->delete($id, -1);
    if ($res):
      $response = array("res" => "clients {$id} deleted", "status" => $res);
      Response::success($response);
    else:
      Response::error("Unable to delete clients {$id}");
    endif;
  else:
    Response::error("No clients id");
  endif;
endif;

*/