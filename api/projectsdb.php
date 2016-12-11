<?php

require_once('functions.php');

class Project {
	private $pid;
	private $uid;
	private $iid;

	 public static function connect() {
	 	$hn = "classroom.cs.unc.edu";
		$db = "maht33ndb";
		$usr = "maht33n";
		$pw = "drawsomemoe!";
    	return new mysqli($hn, $usr, $pw, $db);
     }

	public static function addProject($uid, $iid) {
        global $logger;
		$conn = Project::connect();
		$uid_es = $conn->real_escape_string($uid);
		$iid_es = $conn->real_escape_string($iid);

		$result = $conn->query("INSERT INTO Project(uid, iid) VALUES(" . "'" . $uid_es . "'" . ", '" . $iid_es . "')");
		if($result) {
			$logger->log("Project with id " . $conn->insert_id . " was successfully added.");
			return new Project($conn->insert_id, $uid_es, $iid_es);
		}
		else {
			$logger->log("Error creating new project: " . $conn->error . ".");
			return null;
		}
	}

	private function __construct($pid, $uid, $iid) {
		$this->pid = $pid;
		$this->uid = $uid;
		$this->iid = $iid;
	}

	public function getPid() {
		return $this->pid;
	}

	public function getUid() {
		return $this->uid;
	}

	public function getIid() {
		return $this->iid;
	}
}
?>