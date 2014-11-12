<?php

// Show errors
/*
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);
*/

// Include our dependencies
require '../vendor/autoload.php';
require_once 'bookmark.php';
require_once 'mysqlprovider.php';
require_once 'tag.php';
require_once 'user.php';

$app = new \Slim\Slim();

// Register resources for dependency injection
// TODO: Move this to a Configuration class
// that reads from a YAML/XML/JSON/etc file
$app->dbConfig = array (
	'mysql_domain' => 'localhost',
	'mysql_username' => '',
	'mysql_password' => '',
	'mysql_database' => ''
);

$app->dataProvider = new MySQLProvider($app->dbConfig);

//Routes
$app->get('/hello/:name', function ($name) {
	echo "Hello, $name";
});

/*
$app->get('/users', function () use ($app) {
	$results = $app->dataProvider->Retrieve(array(new User()));

	//Don't let users see a field
	for ($i = 0; $i < count($results); $i++) {
		unset($results[$i]['password']);
	}

	echo json_encode($results);
});
*/

$app->post('/users', function() use ($app) {
	$req = json_decode($app->request->getBody(), true);
	$dbc = $app->dataProvider;

	$users = array_map(function ($user) {
		$userObj = new User();
		$userObj->Username = $user['username'];
		$userObj->Password = $user['password'];
		$userObj->Email = $user['email'];
		return $userObj;
	}, $req);

	$dbc->Create($users);
});

$app->get('/bookmarks/:user_id', function ($user_id) use ($app) {
	$bookmark = new Bookmark();
	$bookmark->UserId = $user_id;
	$results = $app->dataProvider->Retrieve(array($bookmark));

	echo json_encode($results);
});

$app->post('/bookmarks', function () use ($app) {
	$json = json_decode($app->request->getBody(), true);
	$dbc = $app->dataProvider;

	//Replace this with per-CRUD & per-Entity validator
	//possibly at the middleware level
	if (!is_array($json)) {
		$app->response->setStatus(400);
		return;
	}

	$bookmarks = array_map(function ($bookmark) use ($app) {
		$bookmarkObj = new Bookmark();
		$bookmarkObj->UserId = $bookmark['user_id'];
		$bookmarkObj->Title = $bookmark['title'];
		$bookmarkObj->Url = $bookmark['url'];

		$isValidUrl = filter_var($bookmarkObj->Url, FILTER_VALIDATE_URL);
		if (!$isValidUrl || $isValidUrl == "" || isset($isValidUrl)) {
			$app->response->setStatus(400);
		}

		return $bookmarkObj;
	}, $json);

	if ($app->response->getStatus() == 400)
		return;

	if (!$dbc->Create($bookmarks))
		$app->response->setStatus(400);
});

//$app->put();

//$app->delete();

$app->run();