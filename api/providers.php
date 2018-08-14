<?php

include __DIR__ . "/../vendor/autoload.php";

// use the factory to create a Faker\Generator instance
$faker = Faker\Factory::create();

$providers = [];
$allStatuses = [ 'contacted', 'talked', 'assessment', 'contract_signed', 'cancelled' ];

for ($i = 0; $i < 30; $i++) {
    $providers[] = [
        'name' => $faker->name,
        'email' => $faker->safeEmail,
        'phone' => $faker->phoneNumber,
        'id' => $faker->numberBetween(1000, 10000),
        'status' => $allStatuses[array_rand($allStatuses)],
    ];
}

header('Content-type: application/json');

echo json_encode($providers);
