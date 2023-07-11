<?php
require_once('../classes/sessioninfos.classes.php');
require_once('../classes/response.classes.php');
include_once('./apiutil.php');
//require_once '../classes/imagehandler.classes.php';

$sessioninfos = new SessionInfos();
//$imgHandler = new ImageHandler("/app/vss/backend/assets/images/avatars/");

$requestMethod = $_SERVER["REQUEST_METHOD"];
if ($requestMethod == 'GET'):
  $id = getId();
  if ($id):
    $res = $sessioninfos->getById($id);
    $response = array( "data" => $res );
    Response::success($response);
  else:
    $res = $sessioninfos->getAll();
    $response = array( "data" => $res );
    Response::success($response);
  endif;
elseif ($requestMethod == 'POST'):
  //$img = $_FILES['imgInput'];
  //$imgName = isset($img) ? $img['name'] : $_POST['image'];

  $sessioninfo = array(
    'clientid'    => $_POST['clientid']
   ,'sessiondate' => $_POST['sessiondate']
   ,'issue'       => $_POST['issue']
   ,'response'    => $_POST['response']
   ,'loginid'     => -1
  );

  $id = $_POST['sessionid'];
  if (isset($id)):
    $sessioninfo['sessionid'] = $id;
    $res    = $sessioninfos->update($sessioninfo);
    $okMsg  = 'SessionInfo id [ ' . $id . ' ] updated';
    $errMsg = 'Unable to update SessionInfo id [ ' . $id . ' ]';
  else:
    $res    = $sessioninfos->add($sessioninfo);
    $okMsg  = 'New sessioninfo added';
    $errMsg = 'Unable to add sessioninfo';
  endif;

  if ($res):
    $response = array( 'res' => $okMsg, 'sessioninfo' => $res );
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
    $res = $sessioninfos->delete($id, -1);
    if ($res):
      $response = array("res" => "sessioninfos {$id} deleted", "status" => $res);
      Response::success($response);
    else:
      Response::error("Unable to delete sessioninfos {$id}");
    endif;
  else:
    Response::error("No sessioninfos id");
  endif;
endif;

