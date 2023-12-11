<?php
require_once('db.classes.php');

class SessionProperties extends Db
{
  function __construct() {
    parent::__construct();
  }

  function getAll()
  {
    $query = "CALL spGetSessionProperties(-1)";
    return $this->runQuery($query);
  }

  function getById( $sessionpropertyid )
  {
    $query = "CALL spGetSessionProperties( ${sessionpropertyid} )";
    return $this->runQuery($query);
  }
  
  function getBySessionId ( $sessionid) {
    $query = "CALL spGetSessionPropertiesBySessionId( ${sessionid} )";
    return $this->runQuery($query);
  }
  
  //function getSessionPropertyId ($sessionid, $propertytypeid) {
  //  $query = "SELECT * FROM SessionProperties WHERE SessionId = ${sessionid} AND PropertyTypeId = ${propertytypeid}";
  //  $res = $this->runQuery($query);
  //  var_dump($res);
  //  return $res;
  //}

  function add( $sessionproperty )
  {
    try {
      $query = "CALL spAddSessionProperty( :sessionid, :propertytypeid, :propertyvalue, :loginid, @newId )";
      $stmt = $this->pdo->prepare($query);
      $stmt->bindParam(':sessionid', $sessionproperty['sessionid']);
      $stmt->bindParam(':propertytypeid', $sessionproperty['propertytypeid']);
      $stmt->bindParam(':propertyvalue', $sessionproperty['propertyvalue']);
      $stmt->bindParam(':loginid', $sessionproperty['loginid']);
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
  function update( $sessionproperty )
  {
    try {
      $query = "CALL spUpdateSessionProperty( :sessionpropertyid, :sessionid, :propertytypeid, :propertyvalue, :loginid )";
      $stmt = $this->pdo->prepare($query);
      $stmt->bindParam(':sessionpropertyid', $sessionproperty['sessionpropertyid']);
      $stmt->bindParam(':sessionid', $sessionproperty['sessionid']);
      $stmt->bindParam(':propertytypeid', $sessionproperty['propertytypeid']);
      $stmt->bindParam(':propertyvalue', $sessionproperty['propertyvalue']);
      $stmt->bindParam(':loginid', $sessionproperty['loginid']);
      if ($stmt->execute()):
        return $this->getById($sessionproperty['sessionpropertyid']);
      endif;
      return array();
    } catch (Exception $e) {
      echo $e->getMessage();
      return array();
    }
  }

  function delete( $sessionpropertyid, $loginid )
  {
    try {
      $query = "CALL spDeleteSessionProperty( :sessionpropertyid, :loginid )";
      $stmt = $this->pdo->prepare($query);
      $stmt->bindParam(':sessionpropertyid', $sessionpropertyid);
      $stmt->bindParam(':loginid', $loginid);
      if ($stmt->execute()) return 1;
      return 0;
    } catch (Exception $e) {
      echo $e->getMessage();
    }
    return 0;
  }
  
  function deleteByPropertyType($sessionid, $propertytypeid) {
    try {    
      $query = "CALL spDeleteSessionPropertyByPropertyTypeId (${sessionid} AND PropertyTypeId = ${propertytypeid})";
      $stmt = $this->pdo->prepare($query);
      if ($stmt->execute()) return 1;
        return 0;
    } catch (Exception $e) {
      echo $e->getMessage();
    }
    return 0;
  }
}
