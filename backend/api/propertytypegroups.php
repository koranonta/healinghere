<?php
require_once('../classes/propertytypegroups.classes.php');
require_once('../classes/response.classes.php');
include_once('./apiutil.php');
//require_once '../classes/imagehandler.classes.php';

$propertytypegroups = new PropertyTypeGroups();
//$imgHandler = new ImageHandler("/app/vss/backend/assets/images/avatars/");

$requestMethod = $_SERVER["REQUEST_METHOD"];
$pathParams = getPathParam();
if ($requestMethod == 'GET'):
  $id  = empty($pathParams) ? "" : $pathParams[0];
  $res = ($id == "") ? $res = $propertytypegroups->getAll() : $propertytypegroups->getById($id);
  $response = array( "data" => $res );
  Response::success($response);
elseif ($requestMethod == 'POST'):
  if (empty($_POST))
    $_POST = getBody();
  $propertytypegroup = array(
    'propertytypegroupname' => $_POST['propertytypegroupname']
   ,'loginid'               => $_POST['loginid']
  );

  //$img = $_FILES['imgInput'];
  //$imgName = isset($img) ? $img['name'] : $_POST['image'];

  $res    = $propertytypegroups->add($propertytypegroup);
  $okMsg  = 'New propertytypegroup added';
  $errMsg = 'Unable to add propertytypegroup';
  if ($res):
    $response = array( 'res' => $okMsg, 'propertytypegroup' => $res );
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
  $propertytypegroup = array(
    'propertytypegroupname' => $_POST['propertytypegroupname']
   ,'loginid'               => $_POST['loginid']
  );

  $propertytypegroup['propertytypegroupid'] = $id;
  $res    = $propertytypegroups->update($propertytypegroup);
  $okMsg  = 'PropertyTypeGroup id [ ' . $id . ' ] updated';
  $errMsg = 'Unable to update PropertyTypeGroup id [ ' . $id . ' ]';
  if ($res):
    $response = array( 'res' => $okMsg, 'propertytypegroup' => $res );
    Response::success($response);
  else:
    Response::error($errMsg);
  endif;

elseif ($requestMethod == 'DELETE'):
  $id=$pathParams[0];
  $loginId = $pathParams[1] == null ? -1 : $pathParams[1];
  if ($id):
    $res = $propertytypegroups->delete($id, $loginId);
    if ($res):
      $response = array("res" => "propertytypegroups {$id} deleted", "status" => $res);
      Response::success($response);
    else:
      Response::error("Unable to delete propertytypegroups {$id}");
    endif;
  else:
    Response::error("No propertytypegroups id");
  endif;
endif;

