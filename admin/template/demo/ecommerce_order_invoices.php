<?php
  /* 
   * Paging
   */

  //var_dump($_POST["selected"]);


  $iTotalRecords = 23;
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
    array("success" => "Paid"),
    array("danger" => "Canceled")
  );

  for($i = $iDisplayStart; $i < $end; $i++) {
    $status = $status_list[rand(0, 2)];
    $id = ($i + 1);
    $records["aaData"][] = array(
      '<input type="checkbox" name="id[]" value="'.$id.'">',
      $id,      
      'Test Customer',
      '12/09/2013',
      '234$',
      '<span class="label label-sm label-'.(key($status)).'">'.(current($status)).'</span>',
      '<a href="javascript:;" class="btn btn-xs default btn-editable"><i class="fa fa-print"></i> Print</a>',
    );
  }

  if (isset($_REQUEST["sAction"]) && $_REQUEST["sAction"] == "group_action") {
    $records["sStatus"] = "OK"; // pass custom message(useful for getting status of group actions)
    $records["sMessage"] = "Group action successfully has been completed. Well done!"; // pass custom message(useful for getting status of group actions)
  }

  $records["sEcho"] = $sEcho;
  $records["iTotalRecords"] = $iTotalRecords;
  $records["iTotalDisplayRecords"] = $iTotalRecords;
  
  echo json_encode($records);
?>