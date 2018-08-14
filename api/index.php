<?php

require_once __DIR__ . '/config.php';
require_once __DIR__ . "/../vendor/autoload.php";

use Twilio\Rest\Client;

if (empty($_REQUEST['provider_id']) || ! is_numeric($_REQUEST['provider_id'])) {
    die("A correct provider ID must be sent in the 'provider_id' request field.");
}
$providerId = (int) $_REQUEST['provider_id'];

if (empty($_REQUEST['phone_number'])
    || ! preg_match('/^[-\.\+\d\(\)\sx]+$/', rawurldecode($_REQUEST['phone_number']))) {
    die("A correct provider's phone number should be sent in the 'phone_number' request field");
}

$redis = new \Redis();
$redis->connect('/var/run/redis/redis.sock');
$redis->select(1);
$redis->set(CALL_STATUS_STORAGE_PREFIX . $providerId, 0);

try {
    $client = new Client(ACCOUNT_SID, AUTH_TOKEN);
    $client->account->calls->create(
        ADMIN_PHONE_NUMBER,
        HOST_TWILIO_NUMBER,
        [
            'url' => APP_ROOT_URL . '/api/redirect_call.php?provider_id=' . $providerId . '&phone_number=' . rawurlencode($_REQUEST['phone_number']),
            'statusCallbackEvent' => 'completed',
            'statusCallback' => APP_ROOT_URL . '/api/call_completed.php?provider_id=' . $providerId,
            'statusCallbackMethod' => 'GET',
        ]
    );
} catch (\Exception $e) {
    echo "ERROR: {$e->getMessage()}";

    $redis->set(CALL_STATUS_STORAGE_PREFIX . $providerId, -1);
}

$redis->close();
