<?php

class Tag implements IEntity {
	public $EntityName = 'tag';

	public $PrimaryKey;
	public $BookmarkId;
	public $Text;

	public function Serialize () {
		return array (
			'tag_id' => new EntityProperty('tag_id', $this->PrimaryKey, 'int'),
			'bookmark_id' => new EntityProperty('bookmark_id', $this->BookmarkId, 'int'),
			'text' => new EntityProperty('text', $this->Text, 'string')
		);
	}

	public function Deserialize ($user) {
		$this->PrimaryKey = $user['tag_id']->value;
		$this->BookmarkId = $user['bookmark_id']->value;
		$this->Text = $user['text']->value;
	}

	public function getBookmark ($dataProvider) {
		$bookmark = new Bookmark();
		$bookmark->PrimaryKey = $this->BookmarkId;
		return $dataProvider->Retrieve($bookmark);
	}
}