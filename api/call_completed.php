<?php

require_once __DIR__ . '/config.php';

$providerId = (int) $_REQUEST['provider_id'];

$redis = new \Redis();
$redis->connect('/var/run/redis/redis.sock');
$redis->select(1);
$redis->delete(CALL_STATUS_STORAGE_PREFIX . $providerId);
$redis->close();
