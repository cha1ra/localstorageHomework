<?php
$command='export LANG=ja_JP.UTF-8; /anaconda3/bin/python /Applications/XAMPP/xamppfiles/htdocs/gs/js02/homework/py/scrayping.py "'.$_POST['word'].'" "'.$_POST['status'].'"';
system($command,$output);
echo "$output";

//exec($command, $output);
//print "$output[1]\n";
?>