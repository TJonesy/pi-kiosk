<?php
// File Name: proxy.php
$api_key = '249b4413135bd49fa99128e33d4bcfdf';
$API_ENDPOINT = 'https://api.forecast.io/forecast/';
$url = $API_ENDPOINT . $api_key . '/';
if(!isset($_GET['url'])) die();
$url = $url . $_GET['url'];
$url = file_get_contents($url);
print_r($url);