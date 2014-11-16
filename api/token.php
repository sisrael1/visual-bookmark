<?php

require_once 'ientity.php';
require_once 'entityproperty.php';

class Token implements IEntity {
	public $EntityName = 'token';

	public $PrimaryKey;
	public $UserId;
	public $TokenString;

	function __construct ($userid) {
		$this->UserId = $userid;
		$this->TokenString = $this->genToken($userid);
	}

	private function genToken ($userid) {
		return hash("sha512", $userid + rand());
	}

	public function Serialize ($withPrimaryKey = true) {
		return array (
			'token_id' => new EntityProperty('token_id', $this->PrimaryKey, 'int'),
			'user_id' => new EntityProperty('user_id', $this->UserId, 'int'),
			'token_string' => new EntityProperty('token_string', $this->TokenString, 'string')
		);
	}

	public function Deserialize ($user) {
		$this->PrimaryKey = $user['token_id']->value;
		$this->BookmarkId = $user['token_string']->value;
	}
}