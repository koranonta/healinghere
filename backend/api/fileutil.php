<?php

function deleteFile( $filename )
{
  if (file_exists($filename)):
    $success = unlink($filename);
    if (!$success):
      throw new Exception("Cannot delete $filename");
    endif;
  endif;
}
