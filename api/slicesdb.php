<?php

require_once('functions.php');

class Slice {
	private $sid;
	private $pid;
	private $isDone;
	private $isOpen;
	private $name;

	 public static function connect() {
	 	$hn = "classroom.cs.unc.edu";
		$db = "maht33ndb";
		$usr = "maht33n";
		$pw = "drawsomemoe!";
    	return new mysqli($hn, $usr, $pw, $db);
     }

	public static function addSlice($pid, $name) {
        global $logger;
		$conn = Slice::connect();
		$pid_es = $conn->real_escape_string($pid);
		$name_es = $conn->real_escape_string($name);

		$result = $conn->query("INSERT INTO Slice(pid, name) VALUES(" . "'" . $pid_es . "'" . ", '" . $name_es . "')");
		if($result) {
			$logger->log("Slice #" . $conn->insert_id . " was successfully added for project with id: " . $pid_es . ".");
			return new Slice($conn->insert_id, $pid_es, $name_es);
		}
		else {
			$logger->log("Error creating new slice: " . $conn->error . ".");
			return null;
		}
	}

	private function __construct($sid, $pid, $name) {
		$this->sid = $sid;
		$this->pid = $pid;
		$this->name = $name;
	}

	public function getSid() {
		return $this->sid;
	}

	public function getPid() {
		return $this->pid;
	}

	public function getName() {
		return $this->name;
	}
}
?>