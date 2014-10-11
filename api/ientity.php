<?php

interface IEntity {
	/*
	 * returns array of IEntityProperty
	 */
	public function Serialize ();
	/*
	 * takes an array of IEntityProperty
	 */
	public function Deserialize ($entity);
}