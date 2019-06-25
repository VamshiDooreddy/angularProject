<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$requestMethod = $_SERVER["REQUEST_METHOD"];
if($requestMethod == "POST"){
	require_once 'db.php';
	$sql = "SELECT * FROM tbl_registration";
	$result = mysqli_query($conn,$sql);
	if(mysqli_num_rows($result)>0){
		$data = [];
		while($row = mysqli_fetch_assoc($result)){
			array_push($data,$row);
		}
		$response = [
			"data"=>$data,
			"message"=>"ok",
			"status"=>true
		];
	}else{
		$response = [
			"data"=>[],
			"message"=>"No records found",
			"status"=>false
		];
	}
}else{
	$response = [
			"data"=>[],
			"message"=>"Request method should be POST",
			"status"=>false
		];
}
echo json_encode($response);
?>