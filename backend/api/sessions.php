<?php
require_once('../classes/sessions.classes.php');
require_once('../classes/response.classes.php');
include_once('./apiutil.php');
//require_once '../classes/imagehandler.classes.php';

$sessions = new Sessions();
//$imgHandler = new ImageHandler("/app/vss/backend/assets/images/avatars/");

$requestMethod = $_SERVER["REQUEST_METHOD"];
$pathParams = getPathParam();
if ($requestMethod == 'GET'):
  $id  = empty($pathParams) ? "" : $pathParams[0];
  $res = ($id == "") ? $res = $sessions->getAll() : $sessions->getById($id);
  $response = array( "data" => $res );
  Response::success($response);
elseif ($requestMethod == 'POST'):
  if (empty($_POST))
    $_POST = getBody();
  $session = array(
    'clientid'    => $_POST['clientid']
   ,'sessiondate' => $_POST['sessiondate']
   ,'issue'       => $_POST['issue']
   ,'response'    => $_POST['response']
   ,'loginid'     => $_POST['loginid']
  );

  //$img = $_FILES['imgInput'];
  //$imgName = isset($img) ? $img['name'] : $_POST['image'];

  $res    = $sessions->add($session);
  $okMsg  = 'New session added';
  $errMsg = 'Unable to add session';
  if ($res):
    $response = array( 'res' => $okMsg, 'session' => $res );
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
  if (empty($_POST))
    $_POST = getBody();
  $session = array(
    'clientid'    => $_POST['clientid']
   ,'sessiondate' => $_POST['sessiondate']
   ,'issue'       => $_POST['issue']
   ,'response'    => $_POST['response']
   ,'loginid'     => $_POST['loginid']
  );

  $session['sessionid'] = $id;
  $res    = $sessions->update($session);
  $okMsg  = 'Session id [ ' . $id . ' ] updated';
  $errMsg = 'Unable to update Session id [ ' . $id . ' ]';
  if ($res):
    $response = array( 'res' => $okMsg, 'session' => $res );
    Response::success($response);
  else:
    Response::error($errMsg);
  endif;

elseif ($requestMethod == 'DELETE'):
  $id=$pathParams[0];
  $loginId = $pathParams[1] == null ? -1 : $pathParams[1];
  if ($id):
    $res = $sessions->delete($id, $loginId);
    if ($res):
      $response = array("res" => "sessions {$id} deleted", "status" => $res);
      Response::success($response);
    else:
      Response::error("Unable to delete sessions {$id}");
    endif;
  else:
    Response::error("No sessions id");
  endif;
endif;

