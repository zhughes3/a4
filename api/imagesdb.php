<?php

require_once('functions.php');

class Image {
	private $iid;
	private $href;
	private $name;

	 public static function connect() {
	 	$hn = "classroom.cs.unc.edu";
		$db = "maht33ndb";
		$usr = "maht33n";
		$pw = "drawsomemoe!";
    	return new mysqli($hn, $usr, $pw, $db);
  }

	public static function addImage($href, $name) {
		$conn = Image::connect();
		$href_es = $conn->real_escape_string($href);
		$name_es = $conn->real_escape_string($name);

		$result = $conn->query("INSERT INTO Image(href, name) VALUES(" . "'" . $href_es . "'" . ", '" . $name_es . "')");
		if($result) {
			$logger->log("Image " . $name_es . " having relative path " . $href_es . " was successfully added.");
			return new Image($conn->insert_id, $href_es, $name_es);

		}
		else {
			$logger->log("Error adding image " . $name_es . " having relative path " . $href_es . ".");
			return null;
		}
	}

	private function __construct($iid, $href, $name) {
		$this->iid = $iid;
		$this->href = $href;
		$this->name = $name;
	}
}

public function getId() {
	return $this->iid;
}

public function getHref() {
	return $this->href;
}

public function getName() {
	return $this->name;
}

?>