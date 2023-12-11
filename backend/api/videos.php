<?php
require_once '../classes/response.classes.php';
require_once '../classes/imagehandler.classes.php';
require_once('../classes/videos.classes.php');
require_once 'config.php';
require_once 'apiutil.php';
require_once 'fileutil.php';

$assetHandler = new ImageHandler(K_VIDEO_PATH);
$videos = new Videos();

$documentRoot = $_SERVER['DOCUMENT_ROOT'];
$requestMethod = $_SERVER["REQUEST_METHOD"];
$pathParams = getPathParam();
if ($requestMethod == 'GET'):
  $id  = empty($pathParams) ? "" : $pathParams[0];
  $res = ($id == "") ? $res = $videos->getAll() : $videos->getById($id);
  $response = array( "data" => $res );
  Response::success($response);
elseif ($requestMethod == 'POST'):
  $msg = "";
  try {
    //  Get video information
    $video = $_FILES['video'];
    $videoName = $video['name'];
    $title = $videoName;
    $index = strpos($title, ".");
    if ($index > -1)
      $title = substr($title, 0, $index);
    $thumbFn = $title = str_replace(' ', '-', $title);
    $videoFn = str_replace(' ', '-', $video['name']);
    $loginid = $_POST['loginid'];
    $msg = "Unable to add video [ " . $videoName . " ]";

    //  Save thumbnail image
    $file_chunks = explode(";base64,", $_POST['thumb']);
    $fileType = explode("image/", $file_chunks[0]);
    $image_type = $fileType[1];
    $base64Img = base64_decode($file_chunks[1]);
    $thumbFn = $thumbFn . '.' . $image_type;
    $file = $documentRoot . K_VIDEO_THUMBNAIL_PATH . $thumbFn;
    file_put_contents($file, $base64Img);

    //  Save video
    $video['name'] = $videoFn;
    $assetHandler->saveImage($video);

    //  Save in database
    $videoRec = array(
      'name'      => $title
     ,'videoname' => $videoFn
     ,'thumbnail' => $thumbFn 
     ,'loginid'   => $loginid
    );
    $res = $videos->add( $videoRec );
    if ($res):
      $msg  = "Video [ " . $videoFn . " ] added";
      $response = array( "res" => $msg, "video" => $res );
      Response::success($response);
    else:
      Response::error($msg);
    endif;
  }
  catch (Exception $e) {
    Response::error($msg . $e->getMessage());
  }
elseif ($requestMethod == 'DELETE'):
  $id  = empty($pathParams) ? "" : $pathParams[0];
  if ($id != ""):
    $res = $videos->getById($id);
    if (!empty($res)):
      var_dump($res);
      $videoId = $res[0]['videoid'];
      $videoName = $res[0]['videoname'];
      $videoPath = $documentRoot . K_VIDEO_PATH . $videoName;
      $thumbPath = $documentRoot . K_VIDEO_THUMBNAIL_PATH . $res[0]['thumbnail'];
      try {
        deleteFile($thumbPath);
        deleteFile($videoPath);
        $videos->delete( $videoId, -1 );
        $msg = "Video [ " . $videoName . " ] is successfully deleted";
        $response = array("res" => $msg, "status" => $res);
        Response::success($response);
      }
      catch (Exception $e) {
        Response::error("Unable to delete video [ " . $videoName . " ] - " . $e->getMessage());
      }
    else:
      Response::error("Record not found");
    endif;
  endif;
else:
  Response::error("Unknown resource");
endif;



  //var_dump($video);
  //var_dump($videoName);
  //var_dump($title);


/*

if ($requestMethod == 'GET'):
  $id = getId();
  if ($id):
    $res = $videos->getById($id);
    $response = array( "data" => $res );
    Response::success($response);
  else:
    $res = $videos->getAll();
    $response = array( "data" => $res );
    Response::success($response);
  endif;

  //$path = '../assets/video';
  //$files = array_diff(scandir($path), array('.', '..'));
  //$resp = array();
  //foreach($files as $file) 
  //  $resp[] = $file;
  //Response::success($resp);
  
*/