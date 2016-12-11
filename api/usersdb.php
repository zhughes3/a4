<?php

class User {
	private $uid;
	private $email;
	private $fname;

	 public static function connect() {
	 	$hn = "classroom.cs.unc.edu";
		$db = "maht33ndb";
		$usr = "maht33n";
		$pw = "drawsomemoe!";
    	return new mysqli($hn, $usr, $pw, $db);
  }

	public static function addUser($email, $fname) {
		$conn = User::connect();
		$email = $conn->real_escape_string($email);
		$fname = $conn->real_escape_string($fname);

		$result = $conn->query("INSERT INTO User(email, fname) VALUES(" . "'" . $email . "'" . ", '" . $fname . "')");
		if($result) {
			print("User " . $fname . " with email " . $email . " was successfully added.");
			return new User($conn->insert_id, $email, $fname);

		}
		else {
			print("Error adding user " . $fname . " with email " . $email . ".");
			return null;
		}
	}

	private function __construct($uid, $email, $fname) {
		$this->uid = $uid;
		$this->email = $email;
		$this->fname = $fname;
	}
}

public function getUid() {
	return $this->uid;
}

public function getEmail() {
	return $this->email;
}

public function getFirstName() {
	return $this->fname;
}


?>