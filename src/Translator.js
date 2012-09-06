Translator = {
 translations: {
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
  },
  convertMove: function(move)
  {
    var face = move[0];
    var suffix = move.substring(1);  
    return Algorithm.opposites[face] + suffix;
  },
  fixMove: function(causingMove, move)
  {
    var face = move[0];
    var suffix = move.substring(1)
    var causingMoveFace = causingMove[0];
    var causingMoveSuffix = causingMove.substring(1);

    if (causingMoveSuffix == "'")
      return Translator.fixMove(causingMove[0] + "2", Translator.fixMove(causingMoveFace, move))

    if (causingMoveSuffix == "2")
      return Translator.fixMove(causingMove[0], Translator.fixMove(causingMoveFace, move));

    return Translator.translations[causingMove[0]][face] + suffix;
  },
  convertFirstMove: function(alg)
  {
    var moves = Algorithm.splitAlg
    (alg);
    moves[0] = Translator.convertMove(moves[0]);
    var i;
    for (i = 1; i < moves.length; i++)
    {
      moves[i] = Translator.fixMove(moves[0], moves[i]); 
    }
    return moves.join(" ");
  },
  formatInput: function(alg)
  {
    moves = Algorithm.splitAlg(alg);
    if (moves[moves.length-1][0] == "U") {
      moves.pop();
    }
    return moves.join(" ");
  },
  meetsRobertYausCriteria: function(alg)
  {
    if (Algorithm.numberOfFaceTurns(alg, "D") > 1)
      return false;

    return true;
  },
  findAllWays: function(alg) 
  {
    if (alg == "")
    {
      return [""]
    }  
    var bases = [];
    bases.push(alg);
    bases.push(Translator.convertFirstMove(alg))
    var result = [];
    var j;
    for (j = 0; j < bases.length; j++)
    {
      var tails = Translator.findAllWays(Algorithm.restOfMoves(bases[j]))
      var i;
      for (i = 0; i < tails.length; i++)
      {
        var newalg = Algorithm.firstMove(bases[j]) 
        if (tails[i] != "")
          newalg += " " + tails[i];
        if (Translator.meetsRobertYausCriteria(newalg))
          result.push(newalg)
      }
    }
    return result.slice(0);
  }
}
