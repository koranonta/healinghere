<?php
require_once('../classes/healthinfos.classes.php');
require_once('../classes/response.classes.php');
include_once('./apiutil.php');
//require_once '../classes/imagehandler.classes.php';

$healthinfos = new HealthInfos();
//$imgHandler = new ImageHandler("/app/vss/backend/assets/images/avatars/");

$requestMethod = $_SERVER["REQUEST_METHOD"];
$pathParams = getPathParam();
if ($requestMethod == 'GET'):
  $id  = empty($pathParams) ? "" : $pathParams[0];
  $res = ($id == "") ? $res = $healthinfos->getAll() : $healthinfos->getById($id);
  $response = array( "data" => $res );
  Response::success($response);
elseif ($requestMethod == 'POST'):
  if (empty($_POST))
    $_POST = getBody();
  $healthinfo = array(
    'clientid'       => $_POST['clientid']
   ,'symptoms'       => $_POST['symptoms']
   ,'symptomstr'     => $_POST['symptomstr']
   ,'notifdiseases'  => $_POST['notifdiseases']
   ,'notifdiseasestr'=> $_POST['notifdiseasestr']
   ,'diabetes'       => $_POST['diabetes']
   ,'diabetestr'     => $_POST['diabetestr']
   ,'pregnancy'      => $_POST['pregnancy']
   ,'pregnancytr'    => $_POST['pregnancytr']
   ,'allergies'      => $_POST['allergies']
   ,'allergiestr'    => $_POST['allergiestr']
   ,'medhist'        => $_POST['medhist']
   ,'medhistdet'     => $_POST['medhistdet']
   ,'currmed'        => $_POST['currmed']
   ,'currmeddet'     => $_POST['currmeddet']
   ,'gpname'         => $_POST['gpname']
   ,'gppracticeaddr' => $_POST['gppracticeaddr']
   ,'loginid'        => $_POST['loginid']
  );

  //$img = $_FILES['imgInput'];
  //$imgName = isset($img) ? $img['name'] : $_POST['image'];

  $res    = $healthinfos->add($healthinfo);
  $okMsg  = 'New healthinfo added';
  $errMsg = 'Unable to add healthinfo';
  if ($res):
    $response = array( 'res' => $okMsg, 'healthinfo' => $res );
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
  $healthinfo = array(
    'clientid'       => $_POST['clientid']
   ,'symptoms'       => $_POST['symptoms']
   ,'symptomstr'     => $_POST['symptomstr']
   ,'notifdiseases'  => $_POST['notifdiseases']
   ,'notifdiseasestr'=> $_POST['notifdiseasestr']
   ,'diabetes'       => $_POST['diabetes']
   ,'diabetestr'     => $_POST['diabetestr']
   ,'pregnancy'      => $_POST['pregnancy']
   ,'pregnancytr'    => $_POST['pregnancytr']
   ,'allergies'      => $_POST['allergies']
   ,'allergiestr'    => $_POST['allergiestr']
   ,'medhist'        => $_POST['medhist']
   ,'medhistdet'     => $_POST['medhistdet']
   ,'currmed'        => $_POST['currmed']
   ,'currmeddet'     => $_POST['currmeddet']
   ,'gpname'         => $_POST['gpname']
   ,'gppracticeaddr' => $_POST['gppracticeaddr']
   ,'loginid'        => $_POST['loginid']
  );

  $healthinfo['healthinfoid'] = $id;
  $res    = $healthinfos->update($healthinfo);
  $okMsg  = 'HealthInfo id [ ' . $id . ' ] updated';
  $errMsg = 'Unable to update HealthInfo id [ ' . $id . ' ]';
  if ($res):
    $response = array( 'res' => $okMsg, 'healthinfo' => $res );
    Response::success($response);
  else:
    Response::error($errMsg);
  endif;

elseif ($requestMethod == 'DELETE'):
  $id=$pathParams[0];
  $loginId = $pathParams[1] == null ? -1 : $pathParams[1];
  if ($id):
    $res = $healthinfos->delete($id, $loginId);
    if ($res):
      $response = array("res" => "healthinfos {$id} deleted", "status" => $res);
      Response::success($response);
    else:
      Response::error("Unable to delete healthinfos {$id}");
    endif;
  else:
    Response::error("No healthinfos id");
  endif;
endif;

