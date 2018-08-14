<?php

require_once __DIR__ . '/config.php';
require_once __DIR__ . "/../vendor/autoload.php";

use Twilio\Twiml;

$providerId = (int) $_REQUEST['provider_id'];

$response = new Twiml;

$response->say("Your call will be forwarded to the provider, please hang on.");
$dial = $response->dial([ 'callerId' => ADMIN_PHONE_NUMBER ]);
$dial->number(
    rawurldecode($_REQUEST['phone_number']),
    [
        'statusCallbackEvent' => 'completed',
        'statusCallback' => APP_ROOT_URL . '/api/call_completed.php?provider_id=' . $providerId,
        'statusCallbackMethod' => 'GET',
    ]
);

echo $response;

$redis = new \Redis();
$redis->connect('/var/run/redis/redis.sock');
$redis->select(1);
$redis->set('tc24_call_status_' . $providerId, serialize([ 'status' => 1 ]));
$redis->close();
