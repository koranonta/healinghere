<?php
require_once('db.classes.php');

class PropertyTypes extends Db
{
  function __construct() {
    parent::__construct();
  }

  function getAll()
  {
    $query = "CALL spGetPropertyTypes(-1)";
    return $this->runQuery($query);
  }

  function getById( $propertytypeid )
  {
    $query = "CALL spGetPropertyTypes( ${propertytypeid} )";
    return $this->runQuery($query);
  }

  function add( $propertytype )
  {
    try {
      $query = "CALL spAddPropertyType( :propertytypegroupid, :propertytypename, :alias, :allowablevalues, :processaction, :description, :loginid, @newId )";
      $stmt = $this->pdo->prepare($query);
      $stmt->bindParam(':propertytypegroupid', $propertytype['propertytypegroupid']);
      $stmt->bindParam(':propertytypename', $propertytype['propertytypename']);
      $stmt->bindParam(':alias', $propertytype['alias']);
      $stmt->bindParam(':allowablevalues', $propertytype['allowablevalues']);
      $stmt->bindParam(':processaction', $propertytype['processaction']);
      $stmt->bindParam(':description', $propertytype['description']);
      $stmt->bindParam(':loginid', $propertytype['loginid']);
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
  function update( $propertytype )
  {
    try {
      $query = "CALL spUpdatePropertyType( :propertytypeid, :propertytypegroupid, :propertytypename, :alias, :allowablevalues, :processaction, :description, :loginid )";
      $stmt = $this->pdo->prepare($query);
      $stmt->bindParam(':propertytypeid', $propertytype['propertytypeid']);
      $stmt->bindParam(':propertytypegroupid', $propertytype['propertytypegroupid']);
      $stmt->bindParam(':propertytypename', $propertytype['propertytypename']);
      $stmt->bindParam(':alias', $propertytype['alias']);
      $stmt->bindParam(':allowablevalues', $propertytype['allowablevalues']);
      $stmt->bindParam(':processaction', $propertytype['processaction']);
      $stmt->bindParam(':description', $propertytype['description']);
      $stmt->bindParam(':loginid', $propertytype['loginid']);
      if ($stmt->execute()):
        return $this->getById($propertytype['propertytypeid']);
      endif;
      return array();
    } catch (Exception $e) {
      echo $e->getMessage();
      return array();
    }
  }

  function delete( $propertytypeid, $loginid )
  {
    try {
      $query = "CALL spDeletePropertyType( :propertytypeid, :loginid )";
      $stmt = $this->pdo->prepare($query);
      $stmt->bindParam(':propertytypeid', $propertytypeid);
      $stmt->bindParam(':loginid', $loginid);
      if ($stmt->execute()) return 1;
      return 0;
    } catch (Exception $e) {
      echo $e->getMessage();
    }
    return 0;
  }

}
