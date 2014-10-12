<?php

require_once 'ientity.php';
require_once 'entityproperty.php';

class User implements IEntity {
	public $EntityName = 'user';

	public $PrimaryKey;
	public $Username;
	public $Password;
	public $Email;

	public function Serialize () {
		return array(
			'user_id' => new EntityProperty('user_id', $this->PrimaryKey, 'int'),
			'username' => new EntityProperty('username', $this->Username, 'string'),
			'password' => new EntityProperty('password', $this->Password, 'string'),
			'email' => new EntityProperty('email', $this->Email, 'string'),
		);
	}

	public function Deserialize ($user) {
		$this->PrimaryKey = $user['user_id']->value;
		$this->Username = $user['username']->value;
		$this->Password = $user['password']->value;
		$this->Email = $user['email']->value;
	}
}