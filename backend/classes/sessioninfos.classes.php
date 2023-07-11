<?php
require_once('db.classes.php');

class SessionInfos extends Db
{
  function __construct() {
    parent::__construct();
  }

  function getAll()
  {
    $query = "CALL spGetSessionInfos(-1)";
    return $this->runQuery($query);
  }

  function getById( $sessionid )
  {
    $query = "CALL spGetSessionInfos( ${sessionid} )";
    return $this->runQuery($query);
  }

  function add( $sessioninfo )
  {
    try {
      $query = "CALL spAddSessionInfo( :clientid, :sessiondate, :issue, :response, :loginid, @newId )";
      $stmt = $this->pdo->prepare($query);
      $stmt->bindParam(':clientid', $sessioninfo['clientid']);
      $stmt->bindParam(':sessiondate', $sessioninfo['sessiondate']);
      $stmt->bindParam(':issue', $sessioninfo['issue']);
      $stmt->bindParam(':response', $sessioninfo['response']);
      $stmt->bindParam(':loginid', $sessioninfo['loginid']);
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
  function update( $sessioninfo )
  {
    try {
      $query = "CALL spUpdateSessionInfo( :sessionid, :clientid, :sessiondate, :issue, :response, :loginid )";
      $stmt = $this->pdo->prepare($query);
      $stmt->bindParam(':sessionid', $sessioninfo['sessionid']);
      $stmt->bindParam(':clientid', $sessioninfo['clientid']);
      $stmt->bindParam(':sessiondate', $sessioninfo['sessiondate']);
      $stmt->bindParam(':issue', $sessioninfo['issue']);
      $stmt->bindParam(':response', $sessioninfo['response']);
      $stmt->bindParam(':loginid', $sessioninfo['loginid']);
      if ($stmt->execute()):
        return $this->getById($sessioninfo['sessionid']);
      endif;
      return array();
    } catch (Exception $e) {
      echo $e->getMessage();
      return array();
    }
  }

  function delete( $sessionid, $loginid )
  {
    try {
      $query = "CALL spDeleteSessionInfo( :sessionid, :loginid )";
      $stmt = $this->pdo->prepare($query);
      $stmt->bindParam(':sessionid', $sessionid);
      $stmt->bindParam(':loginid', $loginid);
      if ($stmt->execute()) return 1;
      return 0;
    } catch (Exception $e) {
      echo $e->getMessage();
    }
    return 0;
  }

}
