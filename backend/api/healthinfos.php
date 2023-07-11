<?php
require_once('../classes/healthinfos.classes.php');
require_once('../classes/response.classes.php');
include_once('./apiutil.php');
//require_once '../classes/imagehandler.classes.php';

$healthinfos = new HealthInfos();
//$imgHandler = new ImageHandler("/app/vss/backend/assets/images/avatars/");

$requestMethod = $_SERVER["REQUEST_METHOD"];
if ($requestMethod == 'GET'):
  $id = getId();
  if ($id):
    $res = $healthinfos->getById($id);
    $response = array( "data" => $res );
    Response::success($response);
  else:
    $res = $healthinfos->getAll();
    $response = array( "data" => $res );
    Response::success($response);
  endif;
elseif ($requestMethod == 'POST'):
  //$img = $_FILES['imgInput'];
  //$imgName = isset($img) ? $img['name'] : $_POST['image'];

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
   ,'loginid'        => -1
  );

  $id = $_POST['healthinfoid'];
  if (isset($id)):
    $healthinfo['healthinfoid'] = $id;
    $res    = $healthinfos->update($healthinfo);
    $okMsg  = 'HealthInfo id [ ' . $id . ' ] updated';
    $errMsg = 'Unable to update HealthInfo id [ ' . $id . ' ]';
  else:
    $res    = $healthinfos->add($healthinfo);
    $okMsg  = 'New healthinfo added';
    $errMsg = 'Unable to add healthinfo';
  endif;

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

elseif ($requestMethod == 'DELETE'):
  $id = getId();
  if ($id):
    $res = $healthinfos->delete($id, -1);
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

