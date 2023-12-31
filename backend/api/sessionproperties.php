<?php
require_once('../classes/sessionproperties.classes.php');
require_once('../classes/response.classes.php');
include_once('./apiutil.php');

$sessionproperties = new SessionProperties();

$requestMethod = $_SERVER["REQUEST_METHOD"];
$pathParams = getPathParam();
if ($requestMethod == 'GET'):
  $id  = empty($pathParams) ? "" : $pathParams[0];
  $res = ($id == "") ? $res = $sessionproperties->getAll() : $sessionproperties->getBySessionId($id);
  $response = array( "data" => $res );
  Response::success($response);
elseif ($requestMethod == 'POST'):
  if (empty($_POST))
    $_POST = getBody();

  $blob = addslashes($_POST['propertyvalue']);
  $sessionproperty = array(
    'sessionid'      => $_POST['sessionid']
   ,'propertytypeid' => $_POST['propertytypeid']
   ,'propertyvalue'  => $blob
   ,'loginid'        => $_POST['loginid']
  );

  $res    = $sessionproperties->add($sessionproperty);
  $okMsg  = 'New sessionproperty added';
  $errMsg = 'Unable to add sessionproperty';
  if ($res):
    $response = array( 'res' => $okMsg, 'sessionproperty' => $res );
    Response::success($response);
  else:
    Response::error($errMsg);
  endif;
elseif ($requestMethod == 'PUT'):
  $id=$pathParams[0];
  if (empty($_POST))
    $_POST = getBody();
  $blob = addslashes($_POST['propertyvalue']);
  $sessionproperty = array(
    'sessionid'           => $_POST['sessionid']
   ,'propertytypeid'      => $_POST['propertytypeid']
   ,'propertyvalue'       => $blob
   ,'loginid'             => $_POST['loginid']
  );

  $sessionproperty['sessionpropertyid'] = $id;
  $res    = $sessionproperties->update($sessionproperty);
  $okMsg  = 'SessionProperty id [ ' . $id . ' ] updated';
  $errMsg = 'Unable to update SessionProperty id [ ' . $id . ' ]';
  if ($res):
    $response = array( 'res' => $okMsg, 'sessionproperty' => $res );
    Response::success($response);
  else:
    Response::error($errMsg);
  endif;

elseif ($requestMethod == 'DELETE'):
  $id=$pathParams[0];
  $loginId = $pathParams[1] == null ? -1 : $pathParams[1];
  if ($id):
    $res = $sessionproperties->delete($id, $loginId);
    if ($res):
      $response = array("res" => "sessionproperties {$id} deleted", "status" => $res);
      Response::success($response);
    else:
      Response::error("Unable to delete sessionproperties {$id}");
    endif;
  else:
    Response::error("No sessionproperties id");
  endif;
endif;

