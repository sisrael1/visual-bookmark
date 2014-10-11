<?php

interface IDataProvider {
	public function Create ($entity);
	public function Retrieve ($entity);
	public function Update ($entity);
	public function Delete ($entity);
}