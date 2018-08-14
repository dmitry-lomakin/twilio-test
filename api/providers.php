<?php

include __DIR__ . "/../vendor/autoload.php";

// use the factory to create a Faker\Generator instance
$faker = Faker\Factory::create();

$providers = [];
$allStatuses = [
    [ 'Contacting', 'fas fa-fw fa-arrow-right' ],
    [ 'Talked to the client', 'fas fa-fw fa-phone' ],
    [ 'Assessment scheduled', 'far fa-fw fa-eye' ],
    [ 'Contract signed', 'far fa-fw fa-star' ],
    [ 'Cancel the client', 'fas fa-fw fa-times' ],
];

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
