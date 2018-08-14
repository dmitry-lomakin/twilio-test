<?php

$providerId = (int) $_REQUEST['provider_id'];

$redis = new \Redis();
$redis->connect('/var/run/redis/redis.sock');
$redis->select(1);
$redis->delete('tc24_call_status_' . $providerId);
$redis->close();
