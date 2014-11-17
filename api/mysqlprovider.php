<?php

require_once 'entityproperty.php';
require_once 'idataprovider.php';

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

	public function __destruct () {
		$this->mysqli->close();
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
		// TODO: Change logic to use string join
		foreach ($entities as $entity) {
			$properties = $entity->Serialize(true);
			$fields = ''; // Comma-delimited string of fields
			$values = ''; // Comma-delimited '?' for binding
			$types = ''; // String of types for mysqli
			$valuesArr = array();

			// Fill the strings to construct the query
			foreach ($properties as $property) {
				if ($property->key && $property->value && $property->type) {
					$fields = $fields . $property->key . ',';
					$values = $values . '?,';
					$types = $types . $this->toTypeSpecifier($property->type);
					array_push($valuesArr, &$property->value);
				}
			}

			$fields = rtrim($fields, ',');
			$values = rtrim($values, ',');

			// Prepare the query
			$stmt = $this->mysqli->prepare(
				"INSERT INTO $entity->EntityName " .
				"($fields) VALUES ($values)");

			// Bind the values && execute the statement
			array_unshift($valuesArr, &$types);
			call_user_func_array(array($stmt, "bind_param"), $valuesArr);
			$stmt->execute();

			$error = $this->mysqli->error;
			if ($error != "") {
				return false;
			}
			
			return true;
		}
	}

	public function Retrieve ($entities) {
		// Return all objects matching all of the
		// values returned from serialize that are
		// not empty
		$result = array();

		// TODO: GROUP BY to ensure no duplicates for multiple entity queries
		foreach ($entities as $entity) {
			$properties = $entity->Serialize();
			$fields = array();
			$predicate = array();
			$values = array();
			$results = array();
			$types = '';

			foreach ($properties as $property) {
				array_push($fields, $property->key);
				$results[$property->key] = '';
				if ($property->key && $property->value && $property->type) {
					array_push($predicate, "$property->key = ?");
					array_push($values, &$property->value);
					$types = $types . $this->toTypeSpecifier($property->type);
				}
			}

			$fieldString = join(',', $fields);
			$predicateString = join(' AND ', $predicate);

			$stmt = $this->mysqli->stmt_init();
			if (!$types) {
				$stmt->prepare("SELECT $fieldString FROM $entity->EntityName");
				call_user_func_array(array($stmt, "bind_result"), &$results);
				$stmt->execute();
			} else {
				$stmt->prepare("SELECT $fieldString FROM $entity->EntityName WHERE $predicateString");
				array_unshift($values, &$types);
				call_user_func_array(array($stmt, "bind_param"), $values);
				call_user_func_array(array($stmt, "bind_result"), &$results);
				$stmt->execute();
			}

			while ($stmt->fetch()) {
				$row = array();
				foreach ($results as $key => $value) {
					$row[$key] = $value;
				}
				array_push($result, $row);
			}
		}

		return $result;
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