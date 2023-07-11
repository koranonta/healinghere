<?php
require_once('db.classes.php');

class HealthInfos extends Db
{
  function __construct() {
    parent::__construct();
  }

  function getAll()
  {
    $query = "CALL spGetHealthInfos(-1)";
    return $this->runQuery($query);
  }

  function getById( $healthinfoid )
  {
    $query = "CALL spGetHealthInfos( ${healthinfoid} )";
    return $this->runQuery($query);
  }

  function add( $healthinfo )
  {
    try {
      $query = "CALL spAddHealthInfo( :clientid, :symptoms, :symptomstr, :notifdiseases, :notifdiseasestr, :diabetes, :diabetestr, :pregnancy, :pregnancytr, :allergies, :allergiestr, :medhist, :medhistdet, :currmed, :currmeddet, :gpname, :gppracticeaddr, :loginid, @newId )";
      $stmt = $this->pdo->prepare($query);
      $stmt->bindParam(':clientid', $healthinfo['clientid']);
      $stmt->bindParam(':symptoms', $healthinfo['symptoms']);
      $stmt->bindParam(':symptomstr', $healthinfo['symptomstr']);
      $stmt->bindParam(':notifdiseases', $healthinfo['notifdiseases']);
      $stmt->bindParam(':notifdiseasestr', $healthinfo['notifdiseasestr']);
      $stmt->bindParam(':diabetes', $healthinfo['diabetes']);
      $stmt->bindParam(':diabetestr', $healthinfo['diabetestr']);
      $stmt->bindParam(':pregnancy', $healthinfo['pregnancy']);
      $stmt->bindParam(':pregnancytr', $healthinfo['pregnancytr']);
      $stmt->bindParam(':allergies', $healthinfo['allergies']);
      $stmt->bindParam(':allergiestr', $healthinfo['allergiestr']);
      $stmt->bindParam(':medhist', $healthinfo['medhist']);
      $stmt->bindParam(':medhistdet', $healthinfo['medhistdet']);
      $stmt->bindParam(':currmed', $healthinfo['currmed']);
      $stmt->bindParam(':currmeddet', $healthinfo['currmeddet']);
      $stmt->bindParam(':gpname', $healthinfo['gpname']);
      $stmt->bindParam(':gppracticeaddr', $healthinfo['gppracticeaddr']);
      $stmt->bindParam(':loginid', $healthinfo['loginid']);
      $stmt->execute();
      $stmt->closeCursor();
      $row = $this->pdo->query("SELECT @newId as newId")->fetch(PDO::FETCH_ASSOC);
	    if (isset($row['newId'])):
	      return $this->getById($row['newId']);
	    endif;
	    return array();
    } catch (Exception $e) {
      echo $e->getMessage();
      return array();
    }
  }
  function update( $healthinfo )
  {
    try {
      $query = "CALL spUpdateHealthInfo( :healthinfoid, :clientid, :symptoms, :symptomstr, :notifdiseases, :notifdiseasestr, :diabetes, :diabetestr, :pregnancy, :pregnancytr, :allergies, :allergiestr, :medhist, :medhistdet, :currmed, :currmeddet, :gpname, :gppracticeaddr, :loginid )";
      $stmt = $this->pdo->prepare($query);
      $stmt->bindParam(':healthinfoid', $healthinfo['healthinfoid']);
      $stmt->bindParam(':clientid', $healthinfo['clientid']);
      $stmt->bindParam(':symptoms', $healthinfo['symptoms']);
      $stmt->bindParam(':symptomstr', $healthinfo['symptomstr']);
      $stmt->bindParam(':notifdiseases', $healthinfo['notifdiseases']);
      $stmt->bindParam(':notifdiseasestr', $healthinfo['notifdiseasestr']);
      $stmt->bindParam(':diabetes', $healthinfo['diabetes']);
      $stmt->bindParam(':diabetestr', $healthinfo['diabetestr']);
      $stmt->bindParam(':pregnancy', $healthinfo['pregnancy']);
      $stmt->bindParam(':pregnancytr', $healthinfo['pregnancytr']);
      $stmt->bindParam(':allergies', $healthinfo['allergies']);
      $stmt->bindParam(':allergiestr', $healthinfo['allergiestr']);
      $stmt->bindParam(':medhist', $healthinfo['medhist']);
      $stmt->bindParam(':medhistdet', $healthinfo['medhistdet']);
      $stmt->bindParam(':currmed', $healthinfo['currmed']);
      $stmt->bindParam(':currmeddet', $healthinfo['currmeddet']);
      $stmt->bindParam(':gpname', $healthinfo['gpname']);
      $stmt->bindParam(':gppracticeaddr', $healthinfo['gppracticeaddr']);
      $stmt->bindParam(':loginid', $healthinfo['loginid']);
      if ($stmt->execute()):
        return $this->getById($healthinfo['healthinfoid']);
      endif;
      return array();
    } catch (Exception $e) {
      echo $e->getMessage();
      return array();
    }
  }

  function delete( $healthinfoid, $loginid )
  {
    try {
      $query = "CALL spDeleteHealthInfo( :healthinfoid, :loginid )";
      $stmt = $this->pdo->prepare($query);
      $stmt->bindParam(':healthinfoid', $healthinfoid);
      $stmt->bindParam(':loginid', $loginid);
      if ($stmt->execute()) return 1;
      return 0;
    } catch (Exception $e) {
      echo $e->getMessage();
    }
    return 0;
  }

}
