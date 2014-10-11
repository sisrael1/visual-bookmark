<?php

class Bookmark implements IEntity {
	public $EntityName = 'bookmark';

	public $PrimaryKey;
	public $UserId;
	public $Title;
	public $Url;

	public function Serialize () {
		return array (
			'bookmark_id' => new EntityProperty('bookmark_id', $this->PrimaryKey, 'int'),
			'user_id' => new EntityProperty('user_id', $this->UserId, 'int'),
			'title' => new EntityProperty('title', $this->Title, 'string'),
			'url' => new EntityProperty('url', $this->Url, 'string')
		);
	}

	public function Deserialize ($user) {
		$this->PrimaryKey = $user['bookmark_id']->value;
		$this->UserId = $user['user_id']->value;
		$this->Title = $user['title']->value;
		$this->Url = $user['url']->value;
	}

	public function getUser ($dataProvider) {
		$user = new User();
		$user->PrimaryKey = $this->UserId;
		return $dataProvider->Retrieve($user);
	}
}