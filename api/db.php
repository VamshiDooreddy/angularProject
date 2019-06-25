<?php
	$conn = mysqli_connect("localhost","root","Outlook@365","myApp") or die("Database Connection failed");
	date_default_timezone_set("Asia/Kolkata");
	$date = date('m/d/Y h:i:s a', time());
	extract($_REQUEST);
?>
