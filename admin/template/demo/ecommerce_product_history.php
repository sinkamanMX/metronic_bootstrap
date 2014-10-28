<?php
  /* 
   * Paging
   */

  //var_dump($_POST["selected"]);


  $iTotalRecords = 120;
  $iDisplayLength = intval($_REQUEST['iDisplayLength']);
  $iDisplayLength = $iDisplayLength < 0 ? $iTotalRecords : $iDisplayLength; 
  $iDisplayStart = intval($_REQUEST['iDisplayStart']);
  $sEcho = intval($_REQUEST['sEcho']);
  
  $records = array();
  $records["aaData"] = array(); 

  $end = $iDisplayStart + $iDisplayLength;
  $end = $end > $iTotalRecords ? $iTotalRecords : $end;

  $status_list = array(
    array("info" => "Pending"),
    array("success" => "Notified"),
    array("danger" => "Failed")
  );

  for($i = $iDisplayStart; $i < $end; $i++) {
    $status = $status_list[rand(0, 2)];
    $records["aaData"][] = array(
      '12/09/2013 09:20:45',
      'Product has been purchased. Pending for delivery',     
      '<span class="label label-sm label-'.(key($status)).'">'.(current($status)).' <i class="fa fa-check"></i></span>',
      ''
    );
  }

  if (isset($_REQUEST["sAction"]) && $_REQUEST["sAction"] == "group_action") {
    $records["sStatus"] = "OK"; // pass custom message(useful for getting status of group actions)
    $records["sMessage"] = "Group action successfully has been completed. Well done!"; // pass custom message(useful for getting status of group actions)
  }

  $records["sEcho"] = $sEcho;
  $records["iTotalRecords"] = $iTotalRecords;
  $records["iTotalDisplayRecords"] = $iTotalRecords;

  // check http://datatables.net/usage/server-side for more info about ajax datatable
  
  echo json_encode($records);
?>