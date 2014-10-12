<?php

class EntityProperty {
	public $key;
	public $value;
	public $type;

	function __construct ($key, $value, $type) {
		$this->key = $key;
		$this->value = $value;
		$this->type = $type;
	}
}