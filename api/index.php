<?php

include __DIR__ . "/../vendor/autoload.php";

use Twilio\Rest\Client;

$account_sid = '';
$auth_token = '';

// A Twilio number you own with SMS capabilities
$twilio_number = "";

// Where to make a voice call (your cell phone?)
$to_number = "";

try {
    $client = new Client($account_sid, $auth_token);
    $client->account->calls->create(
        $to_number,
        $twilio_number,
        [
            "url" => "http://server1.test58.simplyspamfree.com/twilio-test/api/redirect_call.php"
        ]
    );
} catch (\Exception $e) {
    echo "ERROR: {$e->getMessage()}";
}
