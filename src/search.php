<?php
require_once '../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$apiKey = $_ENV['YOUTUBE_API_KEY'];
$query = $_GET['q'];
$maxResults = 10;

$url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" . urlencode($query) . "&maxResults=$maxResults&type=video&key=$apiKey";

$response = file_get_contents($url);
if ($response === FALSE) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch data']);
    exit();
}

echo $response;
