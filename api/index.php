<?php

require '../vendor/autoload.php';
require 'bookmark.php';
require 'entityproperty.php';
require 'idataprovider.php';
require 'ientity.php';
require 'ientityproperty.php';
require 'mysqlprovider.php';
require 'tag.php';
require 'user.php';

$settings = '';

$app = new \Slim\Slim();

// TODO: Move this to a Configuration class
// that reads from a YAML/XML/JSON/etc file
$app->dbConfig = array (
	'mysql_domain' => '',
	'mysql_username' => '',
	'mysql_password' => '',
	'mysql_database' => ''
);

$app->get('/hello/:name', function ($name) {
	echo "Hello, $name";
});

$app->run();