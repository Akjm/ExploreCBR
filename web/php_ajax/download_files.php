<?php
	$homepage = file_get_contents('https://www.data.act.gov.au/resource/igti-4f4a.json');
	$myfile = fopen("../datasets/basketball_courts.json", "w") or die("Unable to open file!");
	fwrite($myfile, $homepage) or die("Unable to edit file");
	fclose($myfile);
	
	$homepage = file_get_contents('https://www.data.act.gov.au/resource/3np9-m3i7.json');
	$myfile = fopen("../datasets/skate_parks.json", "w") or die("Unable to open file!");
	fwrite($myfile, $homepage) or die("Unable to edit file");
	fclose($myfile);
	
	$homepage = file_get_contents('https://www.data.act.gov.au/resource/fwth-mr9q.json');
	$myfile = fopen("../datasets/playgrounds.json", "w") or die("Unable to open file!");
	fwrite($myfile, $homepage) or die("Unable to edit file");
	fclose($myfile);
	
	$homepage = file_get_contents('https://www.data.act.gov.au/resource/v2u4-uniz.json');
	$myfile = fopen("../datasets/barbeques.json", "w") or die("Unable to open file!");
	fwrite($myfile, $homepage) or die("Unable to edit file");
	fclose($myfile);
	
	$homepage = file_get_contents('https://www.data.act.gov.au/resource/h4qc-3txc.json');
	$myfile = fopen("../datasets/fitness_sites.json", "w") or die("Unable to open file!");
	fwrite($myfile, $homepage) or die("Unable to edit file");
	fclose($myfile);
	
	$homepage = file_get_contents('https://www.data.act.gov.au/resource/3tyf-txjn.json');
	$myfile = fopen("../datasets/toilets.json", "w") or die("Unable to open file!");
	fwrite($myfile, $homepage) or die("Unable to edit file");
	fclose($myfile);
	
	$homepage = file_get_contents('https://www.data.act.gov.au/resource/wyif-uh5r.json');
	$myfile = fopen("../datasets/gazetted_features.json", "w") or die("Unable to open file!");
	fwrite($myfile, $homepage) or die("Unable to edit file");
	fclose($myfile);
	
	echo "Done!";
?>