<?php

include __DIR__ . "/../vendor/autoload.php";

use Twilio\Twiml;

$to = '';

$response = new Twiml;

// get the phone number from the page request parameters, if given
if (! empty($to)) {
    $response->say("Your call will be forwarded to the client, please hang on.");
    $dial = $response->dial([ 'callerId' => '+79606861211' ]);
    $dial->number($to);
} else {
    $response->say("Thanks for calling!");
}

echo $response;
