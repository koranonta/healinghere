<?php
require_once '../classes/response.classes.php';
require_once 'config.php';
require_once 'apiutil.php';
require_once 'fileutil.php';

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
      $image_type = "lzw";
      $imgFn = 'c-' . $clientId . '-s-' . $sessionId . '.' . $image_type;
      $file = K_SESSIONS_IMAGE_DIR . $imgFn;
      deleteFile($file);
      if ($mode != 'delete'):
        file_put_contents($file, $_POST['image']);
      endif;
      $resp['image'] = $_POST['image'];
      $resp['imgfn'] = $file;
    endif;

    //  Save session voice recording
    if (isset($_POST['voice']) && $_POST['voice'] != ""):
      //var_dump($_POST['voice']);
      $audio_file_chunks = explode(";base64,", $_POST['voice']);
      $audio_fileType = explode("audio/", $audio_file_chunks[0]);
      $audio_type = preg_replace('/;.*/', '', $audio_fileType[1]);
      $base64Audio = base64_decode($audio_file_chunks[1]);
      $audioFn = 'c-' . $clientId . '-s-' . $sessionId . '.' . $audio_type;
      $audioFile = K_SESSIONS_VOICE_RECORDING_DIR . $audioFn;
      deleteFile($audioFile);
      if ($mode != 'delete'):
        file_put_contents($audioFile, $base64Audio);
      endif;
      $resp['audiofile'] = $audioFile;
    endif;
    Response::success($resp);
  }
  catch (Exception $e) {
    Response::error($msg . $e->getMessage());
  }
else:
  Response::error("Unknown resource");
endif;
