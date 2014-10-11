<?php

class MySQLProvider implements IDataProvider {
	private $mysqli;

	public function __construct ($config) {
		try {
			$this->mysqli = new mysqli(
				$config['mysql_domain'],
				$config['mysql_username'],
				$config['mysql_password'],
				$config['mysql_database']
			);
		} catch (Exception $e) {
			throw $e;
		}
	}

	private function toTypeSpecifier ($type) {
		switch ($type) {
			case 'string':
				return 's';
				break;
			case 'int':
				return 'i';
				break;
			default:
				return 's';
		}
	}

	public function Create ($entities) {
		// For each value returned from serialize,
		// insert it into the database

		// TODO: GROUP BY $EntityName for multi-insert
		foreach ($entities as $entity) {
			$properties = $entity->Serialize();
			$fields = ''; // Comma-delimited string of fields
			$values = ''; // Comma-delimited '?' for binding
			$types = ''; // String of types for mysqli

			// Fill the strings to construct the query
			foreach ($properties as $property) {
				if ($property->key && $property->value && $property->type) {
					$fields . $property->key . ',';
					$values . '? ,';
					$types . toTypeSpecifier($property->type);
				}
			}

			rtrim($fields, ',');
			rtrim($values, ',');

			// Prepare the query
			$stmt = $this->mysqli->prepare(
				"INSERT INTO $entity->EntityName " .
				"($fields) VALUES ($values)");

			// Prepare the values for binding
			$valuesArr = array_map(function ($prop) {
				return $prop->value;
			}, $properties);

			// Bind the values && execute the statement
			array_unshift($valuesArr, $types);
			call_user_func_array($stmt->bind_param, $valuesArr);
			$stmt->execute();
		}
	}

	public function Retrieve ($entities) {
		// Return all objects matching all of the
		// values returned from serialize that are
		// not empty
	}

	public function Update ($entities) {
		// For each value returned from serialize
		// that is not empty, update the value
		// for the entity identified by its primary
		// key
	}

	public function Delete ($entities) {
		// Mark the deleted flag for the entity
		// identified by its primary key
	}
}