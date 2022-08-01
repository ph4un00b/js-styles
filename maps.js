console.log(Object.prototype);
{
  const mapObject = {};
  console.log(mapObject['toString']);
}

no_prototype: {
  const mapObject = Object.create(null);
  console.log(mapObject['toString']);
}

maps_no_json_friendly: {
  const gamesMap = new Map([
    [1, 'Citadels'],
    [2, 'Tzolkin'],
  ]);
  const json = JSON.stringify(gamesMap);
  console.log({ json });
  //{}
}

map_preserve_order: {
  const gamesMap = new Map([
    [2, 'Tzolkin'],
    [1, 'Citadels'],
  ]);
  const keys = gamesMap.keys();
  console.log({ keys });
  //MapIterator {2, 1}
  const keyValuePairs = gamesMap.entries();
  console.log({ keyValuePairs });
  //MapIterator {2 => "Tzolkin", 1 => "Citadels"}
}
