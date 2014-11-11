<?php

interface IEntity {
	/*
	 * returns array of IEntityProperty
	 */
	public function Serialize ($withPrimaryKey = true);
	/*
	 * takes an array of IEntityProperty
	 */
	public function Deserialize ($entity);
}