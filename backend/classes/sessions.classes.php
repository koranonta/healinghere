<?php
require_once('db.classes.php');

class Sessions extends Db
{
  function __construct() {
    parent::__construct();
  }

  function getAll()
  {
    $query = "CALL spGetSessions(-1)";
    return $this->runQuery($query);
  }

  function getById( $sessionid )
  {
    $query = "CALL spGetSessions( ${sessionid} )";
    return $this->runQuery($query);
  }
  
  function getByClientId ( $clientid ) {
    $query = "CALL spGetSessionsByClientId( ${clientid} )";
    return $this->runQuery( $query );
  }

  function add( $session )
  {
    try {
      $query = "CALL spAddSession( :clientid, :sessiondate, :issue, :response, :loginid, @newId )";
      $sessionDate = date("Y-m-d H:i:s", strtotime($session['sessiondate']));
      $stmt = $this->pdo->prepare($query);
      $stmt->bindParam(':clientid', $session['clientid']);
      $stmt->bindParam(':sessiondate', $sessionDate);
      $stmt->bindParam(':issue', $session['issue']);
      $stmt->bindParam(':response', $session['response']);
      $stmt->bindParam(':loginid', $session['loginid']);
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
  function update( $session )
  {
    try {
      $query = "CALL spUpdateSession( :sessionid, :clientid, :sessiondate, :issue, :response, :loginid )";
      $stmt = $this->pdo->prepare($query);
      $stmt->bindParam(':sessionid', $session['sessionid']);
      $stmt->bindParam(':clientid', $session['clientid']);
      $stmt->bindParam(':sessiondate', $session['sessiondate']);
      $stmt->bindParam(':issue', $session['issue']);
      $stmt->bindParam(':response', $session['response']);
      $stmt->bindParam(':loginid', $session['loginid']);
      if ($stmt->execute()):
        return $this->getById($session['sessionid']);
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
      $query = "CALL spDeleteSession( :sessionid, :loginid )";
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
