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
require_once 'token.php';

/*
	SET UP GLOBAL RESOURCE STORAGE
*/

$app = new \Slim\Slim();

// Register resources for dependency injection
// TODO: Move this to a Configuration class
// that reads from a YAML/XML/JSON/etc file
$app->dbConfig = array (
	'mysql_domain' => 'localhost',
	'mysql_username' => 'sisrael1',
	'mysql_password' => 'UU+HD2JebrayT',
	'mysql_database' => 'sisrael1'
);

$app->dataProvider = new MySQLProvider($app->dbConfig);

/*
	ROUTES
*/


/**
 * Takes an array of User objects via POST data.
 * Persists each User object.
 */
$app->post('/users', function() use ($app) {
	$json = json_decode($app->request->getBody(), true);
	$dbc = $app->dataProvider;

	$user = new User();
	$user->Username = $json['username'];
	$user->Password = $json['password'];
	$user->Email = $json['email'];

	if (!$dbc->Create($user)) {
		$app->response->setStatus(500);
		return;
	}
});

/**
 * Returns Bookmarks by user_id.
 */
$app->get('/users/:user_id/bookmarks', function ($user_id) use ($app) {
	$dbc = $app->dataProvider;

	$bookmark = new Bookmark();
	$bookmark->UserId = $user_id;
	$results = $app->dataProvider->Retrieve($bookmark);

	echo json_encode($results);
});


/**
 * Takes an array of Bookmark objects via POST data.
 * Persists each Bookmark object.
 */
$app->post('/users/:user_id/bookmarks', function ($user_id) use ($app) {
	$json = json_decode($app->request->getBody(), true);
	$dbc = $app->dataProvider;

	$bookmark = new Bookmark();
	$bookmark->UserId = isset($user_id) ? $user_id : null;
	$bookmark->Title = isset($json['title']) ? $json['title'] : null;
	$bookmark->Url = isset($json['url']) ? $json['url'] : null;

	$isValidUrl = filter_var($bookmark->Url, FILTER_VALIDATE_URL);
	if (!$isValidUrl || $isValidUrl == "" || !isset($isValidUrl)) {
		echo $bookmark->Url;
		$app->response->setStatus(400);
		return;
	}

	if (!$dbc->Create($bookmark))
		$app->response->setStatus(500);
});

$app->delete('/users/:user_id/bookmarks/:bookmark_id', function ($user_id, $bookmark_id) use ($app) {
	$dbc = $app->dataProvider;

	// Try to roll back if fails!!
	$tag = new Tag();
	$tag->BookmarkId = $bookmark_id;
	$dbc->Delete($tag);

	$bookmark = new Bookmark();
	$bookmark->PrimaryKey = $bookmark_id;
	$bookmark->UserId = $user_id;

	if (!$dbc->Delete($bookmark))
		$app->response->setStatus(204);
});

/**
 * Takes a username and password via POST data.
 * Returns a persisted token.
 */
$app->post('/token', function () use ($app) {
	$json = json_decode($app->request->getBody(), true);
	$dbc = $app->dataProvider;

	$userObj = new User();
	$userObj->Username = $json['username'];
	$userObj->Password = $json['password'];

	$users = $dbc->Retrieve($userObj);
	if (empty($users)) {
		$app->response->setStatus(404);
		return;
	}

	$user = $users[0];
	$token = new Token($user['user_id']);
	if (!$dbc->Create($token)) {
		$app->response->setStatus(500);
		return;
	}

	echo json_encode(array(
		'token_string' => $token->TokenString,
		'user_id' => $token->UserId
	));
});

$app->delete('/token/:user_id', function ($user_id) use ($app) {
	$json = json_decode($app->request->getBody(), true);
	$dbc = $app->dataProvider;

	$tokenObj = new Token($user_id);
	$tokenObj->TokenString = $json['session_token'];

	$dbc->Delete($tokenObj);
});

$app->run();