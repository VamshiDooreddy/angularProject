<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$requestMethod = $_SERVER["REQUEST_METHOD"];
if($requestMethod == "POST"){
	require_once 'db.php';
	$sql = "SELECT * FROM tbl_registration WHERE email='$email'";
	$result = mysqli_query($conn,$sql);
	if(mysqli_num_rows($result)>0){
		$response = [
			"message"=>"Email already registered with us.",
			"status"=>false
		];
	}else{
		$sql = "INSERT INTO tbl_registration (email,name,phone,password,registeredDate) VALUES('$email','$name','$phone','$password','$date')";
		$result = mysqli_query($conn,$sql);
		if($result){
			$response = [
				"message"=>"Registration Success.",
				"status"=>true
			];
		}else{
			$response = [
				"message"=>"Unable to proccess your request try again.",
				"status"=>false
			];
		}
	}
}else{
	$response = [
		"message"=>"Request method should be POST",
		"status"=>false
	];
}
echo json_encode($response);
?>