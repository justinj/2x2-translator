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

function splitAlg(alg)
{
  var nospaces = alg.split(" ").join("")
  var moves = [];
  while (nospaces != "" && nospaces[0] != "(")
  {
    var move = nospaces[0];
    nospaces = nospaces.substring(1);
    if (nospaces.length != "" && conversions[nospaces[0]] == undefined)
    {
      move += nospaces[0];
      nospaces = nospaces.substring(1);
    }
    moves.push(move);
  }
  return moves;
}

function firstMove(alg)
{
  return splitAlg
(alg)[0]
}

function restOfMoves(alg)
{
  return splitAlg
(alg).slice(1).join(" ");
}

function numberOfFaceTurns(alg, face)
{
  var moves = splitAlg
(alg);
  var count = 0;
  for (var i = 0; i < moves.length; i++)
  {
    if (moves[i][0] == face)
      count++;
  }
  return count;
}

function convertMove(move)
{
  var face = move[0];
  var suffix = move.substring(1);  
  return conversions[face] + suffix;
}

function translateMove(converted, move)
{
  var face = move[0];
  var suffix = move.substring(1)
  var convertedFace = converted[0];
  var convertedSuffix = converted.substring(1);
  if (convertedSuffix == "'")
    return translateMove(converted[0] + "2", translateMove(convertedFace, move))
  if (convertedSuffix == "2")
    return translateMove(converted[0], translateMove(convertedFace, move));
  return translations[converted[0]][face] + suffix;
}

function convertFirstMove(alg)
{
  var moves = splitAlg
(alg);
  moves[0] = convertMove(moves[0]);
  var i;
  for (i = 1; i < moves.length; i++)
  {
    moves[i] = translateMove(moves[0], moves[i]); 
  }
  return moves.join(" ");
}

function meetsRobertYausCriteria(alg)
{
  if (numberOfFaceTurns(alg, "D") > 1)
    return false;

  return true;
}

function findAllWays(alg) 
{
  if (alg == "")
  {
    return [""]
  }  
  var bases = [];
  bases.push(alg);
  bases.push(convertFirstMove(alg))
  var result = [];
  var j;
  for (j = 0; j < bases.length; j++)
  {
    var tails = findAllWays(restOfMoves(bases[j]))
    var i;
    for (i = 0; i < tails.length; i++)
    {
      var newalg = firstMove(bases[j]) + " " + tails[i];
      if (meetsRobertYausCriteria(newalg))
        result.push(newalg)
    }
  }
  return result.slice(0);
}
