describe("Translator", function() {
  describe("convertMove", function() {
    it("swaps a move with its opposite",function() {
      expect(Translator.convertMove("R")).toEqual("L");
    });
  });

  describe("fixMove", function() {
    it("adjusts a move with respect to another turn", function() {
      expect(Translator.fixMove("R", "D")).toEqual("F");
      expect(Translator.fixMove("R2", "D")).toEqual("U");
      expect(Translator.fixMove("R'", "D")).toEqual("B");

      expect(Translator.fixMove("R", "D'")).toEqual("F'");
      expect(Translator.fixMove("R2", "D'")).toEqual("U'");
      expect(Translator.fixMove("R'", "D'")).toEqual("B'");
    });
  });

  describe("convertFirstMove", function() {
    it("changes the first move to its opposite, and adjusts the rest of the alg accordingly",function() {
      expect(Translator.convertFirstMove("R U")).toEqual("L F");
    });
  });

  describe("meetsRobertYausCriteria", function() {
    it("rejects algs with more than one D move",function() {
      expect(Translator.meetsRobertYausCriteria("R U D")).toEqual(true);
      expect(Translator.meetsRobertYausCriteria("R D U D")).toEqual(false);
    });
  });

  describe("findAllWays", function() {
    it("finds all ways of executing an alg",function() {
      expect(Translator.findAllWays("R U R'")).toEqual(["R U R'", "R U L'", "R D B'", "R D F'", "L F R'", "L F L'", "L B U'", "L B D'"]);
    });
  });

  describe("formatInput", function() {
    it("removes any U moves from the beginning of the input", function() {
      expect(Translator.formatInput("R U R' U'")).toEqual("R U R'");
      expect(Translator.formatInput("R U R'")).toEqual("R U R'");
    });
  });
});