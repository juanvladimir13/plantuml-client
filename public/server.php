<?php
require '../vendor/autoload.php';
use function Jawira\PlantUml\encodep;

function encodePlantUML(string $plantUMLContent): string
{
  $config = require '../.env.php';
  $encode = encodep($plantUMLContent);
  $url = "{$config['server']}:{$config['port']}";
  return "{$url}/plantuml/svg/{$encode}";
}

$svg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $svg = encodePlantUML($_POST['m'] ?? '');
}

echo $svg;