<?php
require_once('../classes/propertytypes.classes.php');
require_once('../classes/response.classes.php');
include_once('./apiutil.php');
//require_once '../classes/imagehandler.classes.php';

$propertytypes = new PropertyTypes();
//$imgHandler = new ImageHandler("/app/vss/backend/assets/images/avatars/");

$requestMethod = $_SERVER["REQUEST_METHOD"];
$pathParams = getPathParam();
if ($requestMethod == 'GET'):
  $id  = empty($pathParams) ? "" : $pathParams[0];
  $res = ($id == "") ? $res = $propertytypes->getAll() : $propertytypes->getById($id);
  $response = array( "data" => $res );
  Response::success($response);
elseif ($requestMethod == 'POST'):
  if (empty($_POST))
    $_POST = getBody();
  $propertytype = array(
    'propertytypegroupid'=> $_POST['propertytypegroupid']
   ,'propertytypename' => $_POST['propertytypename']
   ,'alias'            => $_POST['alias']
   ,'allowablevalues'  => $_POST['allowablevalues']
   ,'processaction'    => $_POST['processaction']
   ,'description'      => $_POST['description']
   ,'loginid'          => $_POST['loginid']
  );

  //$img = $_FILES['imgInput'];
  //$imgName = isset($img) ? $img['name'] : $_POST['image'];

  $res    = $propertytypes->add($propertytype);
  $okMsg  = 'New propertytype added';
  $errMsg = 'Unable to add propertytype';
  if ($res):
    $response = array( 'res' => $okMsg, 'propertytype' => $res );
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
  $propertytype = array(
    'propertytypegroupid'=> $_POST['propertytypegroupid']
   ,'propertytypename' => $_POST['propertytypename']
   ,'alias'            => $_POST['alias']
   ,'allowablevalues'  => $_POST['allowablevalues']
   ,'processaction'    => $_POST['processaction']
   ,'description'      => $_POST['description']
   ,'loginid'          => $_POST['loginid']
  );

  $propertytype['propertytypeid'] = $id;
  $res    = $propertytypes->update($propertytype);
  $okMsg  = 'PropertyType id [ ' . $id . ' ] updated';
  $errMsg = 'Unable to update PropertyType id [ ' . $id . ' ]';
  if ($res):
    $response = array( 'res' => $okMsg, 'propertytype' => $res );
    Response::success($response);
  else:
    Response::error($errMsg);
  endif;

elseif ($requestMethod == 'DELETE'):
  $id=$pathParams[0];
  $loginId = $pathParams[1] == null ? -1 : $pathParams[1];
  if ($id):
    $res = $propertytypes->delete($id, $loginId);
    if ($res):
      $response = array("res" => "propertytypes {$id} deleted", "status" => $res);
      Response::success($response);
    else:
      Response::error("Unable to delete propertytypes {$id}");
    endif;
  else:
    Response::error("No propertytypes id");
  endif;
endif;

