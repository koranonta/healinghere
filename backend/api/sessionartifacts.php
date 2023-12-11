<?php
require_once '../classes/response.classes.php';
require_once('../classes/sessionproperties.classes.php');
require_once 'config.php';
require_once 'apiutil.php';
require_once 'fileutil.php';

$sessionproperties = new SessionProperties();
$requestMethod = $_SERVER["REQUEST_METHOD"];
if ($requestMethod == 'POST'):
  $msg = "";
  try {
    $resp = [];
    $mode      = $_POST['mode'];
    $sessionId = $_POST['sessionid'];
    $clientId  = $_POST['clientid'];
    $loginId   = $_POST['loginid'];

    $resp['mode']      = $mode;
    $resp['sessionid'] = $sessionId;
    $resp['clientid']  = $clientId;
    $resp['loginid']   = $loginId;
    
    //  Save session image
    if (isset($_POST['image']) && $_POST['image'] != ""):
      //$blob = addslashes($_POST['image']);
      $blob = $_POST['image'];
      $sessionproperty = array(
        'sessionid'      => $_POST['sessionid']
       ,'propertytypeid' => K_SESSION_IMAGE_TYPE_ID
       ,'propertyvalue'  => $blob
       ,'loginid'        => $_POST['loginid']
      );
      $resp['image'] = $blob;
      $resp['imagestatus'] = "Unable to " . $mode . " image";
      $okMsg  = "Image successfully " . $mode . "ed";
      if ($mode == 'add'):
        $res = $sessionproperties->add($sessionproperty);
      elseif ($mode == 'edit'):
        $sessionproperties->deleteByPropertyType($sessionId, K_SESSION_IMAGE_TYPE_ID);
        $res = $sessionproperties->add($sessionproperty);
      elseif ($mode == 'delete'):
        $sessionpropertyid = $_POST['sessionpropertyid'];
        $res = $sessionproperties->delete($sessionpropertyid, $loginId);
      endif;
      if ($res)
        $resp['imagestatus'] = $okMsg;
    endif;

    //  Save session voice recording
    if (isset($_POST['voice']) && $_POST['voice'] != ""):
      $blob = addslashes($_POST['voice']);
      $resp['voice'] = $blob;
      $sessionproperty = array(
        'sessionid'      => $_POST['sessionid']
       ,'propertytypeid' => K_SESSION_VOICE_RECORDING_TYPE_ID
       ,'propertyvalue'  => $blob
       ,'loginid'        => $_POST['loginid']
      );
      
      $resp['voicestatus'] = "Unable to " . $mode . " voice recording";
      $okMsg  = "Voice recording successfully " . $mode . "ed";
      if ($mode == 'add'):
        $res = $sessionproperties->add($sessionproperty);
      elseif ($mode == 'edit'):
        $sessionproperty['sessionpropertyid'] = $_POST['sessionpropertyid'];
        $sessionproperties->deleteByPropertyType($sessionId, K_SESSION_VOICE_RECORDING_TYPE_ID);
        $res = $sessionproperties->add($sessionproperty);
      elseif ($mode == 'delete'):
        $sessionpropertyid = $_POST['sessionpropertyid'];
        $res = $sessionproperties->delete($sessionpropertyid, $loginId);
      endif;
      if ($res)
        $resp['voicestatus'] = $okMsg;
    endif;
    Response::success($resp);
  }
  catch (Exception $e) {
    Response::error($msg . $e->getMessage());
  }
else:
  Response::error("Unknown resource");
endif;
