<?php
    $feed = simplexml_load_file('https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss');
	$today = $feed->channel->item;
	$title = $today->title;
	$link = $today->link;
	$color = isset($_POST['color'])?'?color=1':'';
	echo "<a href='{$link}'><img src='loadimage.php$color'/><p>{$title}</p></a>";
?>
