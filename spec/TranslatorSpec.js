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

  describe("yRotations", function() {
    it("shows all y rotations of an alg",function() {
      expect(Translator.yRotations("R")).toEqual(["R","y F","y2 L","y' B"]);
      });
  });

  describe("findAllWays", function() {
    it("finds all ways of executing an alg",function() {
      expect(Translator.findAllWays("R U R'")).toEqual(["R U R'", "R U L'", "R D B'", "R D F'", "L F R'", "L F L'", "L B U'", "L B D'"]);
    });
  });

  describe("formatInput", function() {
    it("removes any U moves from the beginning of the input if the options say to", function() {
      expect(Translator.formatInput("R U R' U'", {"remove_trailing_u":true})).toEqual("R U R'");
    });

    it("does not remove U's if the options say not to", function() {
      expect(Translator.formatInput("R U R' U'",{"remove_trailing_u":false})).toEqual("R U R' U'");
    });
  });
});
