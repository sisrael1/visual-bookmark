<?php

require_once 'ientity.php';
require_once 'entityproperty.php';

class Tag implements IEntity {
	public $EntityName = 'tag';

	public $PrimaryKey;
	public $BookmarkId;

	public function Serialize ($withPrimaryKey = true) {
		return array (
			'text' => new EntityProperty('text', $this->PrimaryKey, 'string'),
			'bookmark_id' => new EntityProperty('bookmark_id', $this->BookmarkId, 'int')
		);
	}

	public function Deserialize ($user) {
		$this->PrimaryKey = $user['text']->value;
		$this->BookmarkId = $user['bookmark_id']->value;
	}

	public function getBookmark ($dataProvider) {
		$bookmark = new Bookmark();
		$bookmark->PrimaryKey = $this->BookmarkId;
		return $dataProvider->Retrieve($bookmark);
	}
}