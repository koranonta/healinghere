<?php
require_once('../classes/clients.classes.php');
require_once('../classes/response.classes.php');
include_once('./apiutil.php');
//require_once '../classes/imagehandler.classes.php';

$clients = new Clients();
//$imgHandler = new ImageHandler("/app/vss/backend/assets/images/avatars/");

$requestMethod = $_SERVER["REQUEST_METHOD"];
$pathParams = getPathParam();
if ($requestMethod == 'GET'):
  $id  = empty($pathParams) ? "" : $pathParams[0];
  $res = ($id == "") ? $res = $clients->getAll() : $clients->getById($id);
  $response = array( "data" => $res );
  Response::success($response);
elseif ($requestMethod == 'POST'):
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
   ,'loginid'    => $_POST['loginid']
  );

  //$img = $_FILES['imgInput'];
  //$imgName = isset($img) ? $img['name'] : $_POST['image'];

  $res    = $clients->add($client);
  $okMsg  = 'New client added';
  $errMsg = 'Unable to add client';
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

elseif ($requestMethod == 'PUT'):
  $id=$pathParams[0];
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
   ,'loginid'    => $_POST['loginid']
  );

  $client['clientid'] = $id;
  $res    = $clients->update($client);
  $okMsg  = 'Client id [ ' . $id . ' ] updated';
  $errMsg = 'Unable to update Client id [ ' . $id . ' ]';
  if ($res):
    $response = array( 'res' => $okMsg, 'client' => $res );
    Response::success($response);
  else:
    Response::error($errMsg);
  endif;

elseif ($requestMethod == 'DELETE'):
  $id=$pathParams[0];
  $loginId = $pathParams[1] == null ? -1 : $pathParams[1];
  if ($id):
    $res = $clients->delete($id, $loginId);
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

