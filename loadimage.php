<?php
    $feed = simplexml_load_file('https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss');
	$today = $feed->channel->item;

	$im = ImageCreateFromJpeg((string)$today->enclosure->attributes()->url);
	if(!$im)
 		$im = ImageCreateFromPng((string)$today->enclosure->attributes()->url);
	if(!$im)
 		$im = ImageCreateFromGif((string)$today->enclosure->attributes()->url); 
	$imgw = imagesx($im);
	$imgh = imagesy($im);
	$neww = $imgw/$imgh*400;
	$newh = 400;
	if($neww>1030)
	{
		$neww = 1030;
		$newh = $imgh/$imgw*1030;
	}
	imagefilter($im, IMG_FILTER_GRAYSCALE); 
    $dst = imagecreatetruecolor($neww, $newh);
    imagecopyresampled($dst, $im, 0, 0, 0, 0, $neww, $newh, $imgw, $imgh);
	header('Content-type: image/jpeg');
	imagejpeg($dst);
	
?>