<?php
require_once '../classes/response.classes.php';
require_once '../classes/sessionproperties.classes.php';
require_once 'config.php';
require_once 'apiutil.php';
require_once 'fileutil.php';

$sessionpPoperties = new SessionProperties();

//$documentRoot = $_SERVER['DOCUMENT_ROOT'];
$requestMethod = $_SERVER["REQUEST_METHOD"];
$pathParams = getPathParam();
if ($requestMethod == 'GET'):
  $id  = empty($pathParams) ? "" : $pathParams[0];
  $res = ($id == "") ? $res = $sessionpPoperties->getAll() : $sessionpPoperties->getBySessionId($id);
  $response = array( "data" => $res );
  Response::success($response);
elseif ($requestMethod == 'POST'):
  $msg = "";
  try {
    $resp = [];
    $mode      = $_POST['mode'];
    $sessionId = $_POST['sessionid'];
    $clientId  = $_POST['clientid'];
    $loginId   = $_POST['loginid'];
    
    $resp['mode'] = $mode;
    $resp['sessionid'] = $sessionId;
    $resp['clientid'] = $clientId;
    $resp['loginid'] = $loginId;

    //  Save session image
    $file_chunks = explode(";base64,", $_POST['image']);
    $fileType = explode("image/", $file_chunks[0]);
    $image_type = $fileType[1];
    $base64Img = base64_decode($file_chunks[1]);
    $imgFn = 'c-' . $clientId . '-s-' . $sessionId . '.' . $image_type;
    $file = K_SESSIONS_IMAGE_DIR . $imgFn;
    file_put_contents($file, $base64Img);
    $resp['imgfn'] = $file;

    $baseImgFile = K_IMAGE_DIR . K_CHAKRAS_IMAGE;
    
    //$img1 = new Image($baseImgFile);
    //$img2 = new Image($file);
    //$img2->merge($img1,9,9);
    //$img2->save("./merged.png",IMAGETYPE_PNG);

    
    //$resp['base64Img'] = $base64Img;

    if (isset($_POST['voice'])):
      var_dump($_POST['voice']);
      $audio_file_chunks = explode(";base64,", $_POST['voice']);
      $audio_fileType = explode("audio/", $audio_file_chunks[0]);
      $audio_type = preg_replace('/;.*/', '', $audio_fileType[1]);
      $base64Audio = base64_decode($audio_file_chunks[1]);
      $audioFn = 'c-' . $clientId . '-s-' . $sessionId . '.' . $audio_type;
      $audioFile = K_SESSIONS_VOICE_RECORDING_DIR . $audioFn;
      $resp['audiofile'] = $audioFile;
      file_put_contents($audioFile, $base64Audio);
    endif;


/*
      $response = array( 
        "mode" => $mode,
        "imgFn" => $imgFn, 
        "fileName" => $file 
        "chunk" => $file_chunks
        );
*/        
      Response::success($resp);


/*
    //  Save in database
    $sessionPropRec = array(
      'name'      => $title
     ,'videoname' => $videoFn
     ,'thumbnail' => $thumbFn 
     ,'loginid'   => $loginid
    );
    $res = $sessionpPoperties->add( $sessionPropRec );
    if ($res):
      $msg  = "Video [ " . $videoFn . " ] added";
      $response = array( "res" => $msg, "video" => $res );
      Response::success($response);
    else:
      Response::error($msg);
    endif;
*/
  }
  catch (Exception $e) {
    Response::error($msg . $e->getMessage());
  }
elseif ($requestMethod == 'DELETE'):
  $id  = empty($pathParams) ? "" : $pathParams[0];
  if ($id != ""):
    $res = $sessionpPoperties->getById($id);
    if (!empty($res)):
      var_dump($res);
/*
      $videoId = $res[0]['videoid'];
      $videoName = $res[0]['videoname'];
      $videoPath = $documentRoot . K_VIDEO_PATH . $videoName;
      $thumbPath = $documentRoot . K_VIDEO_THUMBNAIL_PATH . $res[0]['thumbnail'];
      try {
        deleteFile($thumbPath);
        deleteFile($videoPath);
        $sessionpPoperties->delete( $videoId, -1 );
        $msg = "Video [ " . $videoName . " ] is successfully deleted";
        $response = array("res" => $msg, "status" => $res);
        Response::success($response);
      }
      catch (Exception $e) {
        Response::error("Unable to delete video [ " . $videoName . " ] - " . $e->getMessage());
      }
*/
    else:
      Response::error("Record not found");
    endif;
  endif;
else:
  Response::error("Unknown resource");
endif;


