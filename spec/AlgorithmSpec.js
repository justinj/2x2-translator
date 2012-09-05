describe("Algorithm", function() {
  describe("splitAlg", function() {
    it("splits an alg into moves", function() {
      expect(Algorithm.splitAlg("R U' D2")).toEqual(["R","U'","D2"])
    });

    
    it("doesn't care about spaces", function() {
      expect(Algorithm.splitAlg("RU'D2")).toEqual(["R","U'","D2"])
    });

    it("doesn't care about anything in brackets at the end of a line", function() {
      expect(Algorithm.splitAlg("RU' D2(10,2)")).toEqual(["R","U'", "D2"])
    });
  });

  describe("firstMove", function() {
    it("returns the first move in an algorithm", function() {
      expect(Algorithm.firstMove("R U R' U'")).toEqual("R");
    });
  });

  describe("restOfMoves", function() {
    it("returns the moves past the first in an algorithm", function() {
      expect(Algorithm.restOfMoves("R U R' U'")).toEqual("U R' U'");
    });
  });

  describe("numberOfFaceTurns", function() {
    it("counts the number of turns of a specific face in an algorithm", function() {
      expect(Algorithm.numberOfFaceTurns("R U R' U'", "R")).toEqual(2);
    });
  });
});