var conversions = {
  "U": "D",
  "D": "U",
  "F": "B",
  "B": "F",
  "R": "L",
  "L": "R"
}

var translations = {
  "U": {
    "U": "U",
    "D": "D",
    "L": "B",
    "R": "F",
    "F": "L",
    "B": "R"
  },
  "D": {
    "U": "U",
    "D": "D",
    "L": "F",
    "R": "B",
    "F": "R",
    "B": "L"
  },
  "F": {
    "U": "R",
    "D": "L",
    "L": "U",
    "R": "D",
    "F": "F",
    "B": "B"
  },
  "B": {
    "U": "L",
    "D": "R",
    "L": "D",
    "R": "U",
    "F": "F",
    "B": "B"
  },
  "R": {
    "U": "B",
    "D": "F",
    "L": "L",
    "R": "R",
    "F": "U",
    "B": "D"
  },
  "L": {
    "U": "F",
    "D": "B",
    "L": "L",
    "R": "R",
    "F": "D",
    "B": "U"
  }
}

function split_alg(alg)
{
  return alg.split(" ");
}

function first_move(alg)
{
  return split_alg(alg)[0]
}

function rest_of_moves(alg)
{
  return split_alg(alg).slice(1).join(" ");
}

function convert_move(move)
{
  var face = move[0];
  var suffix = move.substring(1);  
  return conversions[face] + suffix;
}

function translate_move(converted, move)
{
  var face = move[0];
  var suffix = move.substring(1)
  var converted_face = converted[0];
  var converted_suffix = converted.substring(1);
  if (converted_suffix == "'")
    return translate_move(converted[0] + "2", translate_move(converted_face, move))
  if (converted_suffix == "2")
    return translate_move(converted[0], translate_move(converted_face, move));
  return translations[converted[0]][face] + suffix;
}

function convert_first_move(alg)
{
  var moves = split_alg(alg);
  moves[0] = convert_move(moves[0]);
  var i;
  for (i = 1; i < moves.length; i++)
  {
    moves[i] = translate_move(moves[0], moves[i]); 
  }
  return moves.join(" ");
}

function find_all_ways(alg) 
{
  if (alg == "")
  {
    return [""]
  }  
  var bases = [];
  bases.push(alg);
  bases.push(convert_first_move(alg))
  var result = [];
  var j;
  for (j = 0; j < bases.length; j++)
  {
    var tails = find_all_ways(rest_of_moves(bases[j]))
    var i;
    for (i = 0; i < tails.length; i++)
    {
      result.push(first_move(bases[j])+ " " +tails[i])
    }
  }
  return result.slice(0);
}