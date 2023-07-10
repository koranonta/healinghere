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
}
