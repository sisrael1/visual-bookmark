<?php

class EntityProperty {
	protected $key;
	protected $value;
	protected $type;

	function __construct ($key, $value, $type) {
		$this->key = $key;
		$this->value = $value;
		$this->type = $type;
	}
}