<?php
require_once('db.classes.php');

class Clients extends Db
{
  function __construct() {
    parent::__construct();
  }

  function getAll()
  {
    $query = "CALL spGetClients(-1)";
    return $this->runQuery($query);
  }

  function getById( $clientid )
  {
    $query = "CALL spGetClients( ${clientid} )";
    return $this->runQuery($query);
  }

  function add( $client )
  {
    try {
      $query = "CALL spAddClient( :clientname, :username, :emailaddress, :lastactive, :signup, :orders, :totalspend, :aov, :country, :city, :region, :postcode, :loginid, @newId )";
      $stmt = $this->pdo->prepare($query);
      $stmt->bindParam(':clientname', $client['clientname']);
      $stmt->bindParam(':username', $client['username']);
      $stmt->bindParam(':emailaddress', $client['emailaddress']);
      $stmt->bindParam(':lastactive', $client['lastactive']);
      $stmt->bindParam(':signup', $client['signup']);
      $stmt->bindParam(':orders', $client['orders']);
      $stmt->bindParam(':totalspend', $client['totalspend']);
      $stmt->bindParam(':aov', $client['aov']);
      $stmt->bindParam(':country', $client['country']);
      $stmt->bindParam(':city', $client['city']);
      $stmt->bindParam(':region', $client['region']);
      $stmt->bindParam(':postcode', $client['postcode']);
      $stmt->bindParam(':loginid', $client['loginid']);
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
  function update( $client )
  {
    try {
      $query = "CALL spUpdateClient( :clientid, :clientname, :username, :emailaddress, :lastactive, :signup, :orders, :totalspend, :aov, :country, :city, :region, :postcode, :loginid )";
      $stmt = $this->pdo->prepare($query);
      $stmt->bindParam(':clientid', $client['clientid']);
      $stmt->bindParam(':clientname', $client['clientname']);
      $stmt->bindParam(':username', $client['username']);
      $stmt->bindParam(':emailaddress', $client['emailaddress']);
      $stmt->bindParam(':lastactive', $client['lastactive']);
      $stmt->bindParam(':signup', $client['signup']);
      $stmt->bindParam(':orders', $client['orders']);
      $stmt->bindParam(':totalspend', $client['totalspend']);
      $stmt->bindParam(':aov', $client['aov']);
      $stmt->bindParam(':country', $client['country']);
      $stmt->bindParam(':city', $client['city']);
      $stmt->bindParam(':region', $client['region']);
      $stmt->bindParam(':postcode', $client['postcode']);
      $stmt->bindParam(':loginid', $client['loginid']);
      if ($stmt->execute()):
        return $this->getById($client['clientid']);
      endif;
      return array();
    } catch (Exception $e) {
      echo $e->getMessage();
      return array();
    }
  }

  function delete( $clientid, $loginid )
  {
    try {
      $query = "CALL spDeleteClient( :clientid, :loginid )";
      $stmt = $this->pdo->prepare($query);
      $stmt->bindParam(':clientid', $clientid);
      $stmt->bindParam(':loginid', $loginid);
      if ($stmt->execute()) return 1;
      return 0;
    } catch (Exception $e) {
      echo $e->getMessage();
    }
    return 0;
  }

}
