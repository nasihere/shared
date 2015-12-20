<?php
    
include_once("config.php");

if (isset($_REQUEST['action']) && $_REQUEST['action'] == ""){ $_REQUEST['action']= "read";}

else if(isset($_REQUEST['action']) && $_REQUEST['action'] == "getAllReports")
{
			$row =mysql_query("SELECT * FROM Reports");
 			if ($row){

				$data = array();
				while($row1 = mysql_fetch_array($row,MYSQL_ASSOC)) {

	                    $data[$row1['r_title']] = $row1;

	            }
	            if (!$data){
	                echo $_REQUEST['action'];
	            }
			}
           echo json_encode($data);
}
else
{
            $result =mysql_query($_REQUEST['qry']);
 			if ($result){

				$encode = array();
				while($row = mysql_fetch_array($result,MYSQL_ASSOC)) {

	                    $encode[] = $row;
	            }
	            if (!$encode){
	                echo $_REQUEST['qry'];
	            }
			}
           echo json_encode($encode);
}
mysql_close($link);
?>