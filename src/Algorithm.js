//Helper class with functions for manipulating algorithms
Algorithm = {
  opposites: 
  {
    "U": "D",
    "D": "U",
    "F": "B",
    "B": "F",
    "R": "L",
    "L": "R"
  },
  splitAlg: function(alg)
  {
    var nospaces = alg.split(" ").join("")
    var moves = [];
    while (nospaces != "" && nospaces[0] != "(")
    {
      var move = nospaces[0];
      nospaces = nospaces.substring(1);
      if (nospaces.length != "" && nospaces[0] != "(" && Algorithm.opposites[nospaces[0]] == undefined)
      {
        move += nospaces[0];
        nospaces = nospaces.substring(1);
      }
      moves.push(move);
    }
    return moves;
  },
  firstMove: function(alg)
  {
    return Algorithm.splitAlg(alg)[0]
  },
  restOfMoves: function(alg)
  {
    return Algorithm.splitAlg(alg).slice(1).join(" ");
  },
  numberOfFaceTurns: function(alg, face)
  {
    var moves = Algorithm.splitAlg(alg);
    var count = 0;
    for (var i = 0; i < moves.length; i++)
    {
      if (moves[i][0] == face)
        count++;
    }
    return count;
  }
}
