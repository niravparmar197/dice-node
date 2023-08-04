const mongoose = require("mongoose");
const Game = require("../models/game");

class GameService {
  async createGame(conditions, betamount) {
    try {
      let newGame = new Game({
        dice1: Game.runGame(),
        dice2: Game.runGame(),
        conditions: conditions,
        betamt: betamount,
      });
      await newGame.save();
      let savedGame = await newGame.getScore(conditions);
      if (
        savedGame?.result === "WIN" &&
        (conditions == "LESS_THEN_SEVEN" || conditions == "GREATER_THEN_SEVEN")
      ) {
        savedGame.winamt = Number(2 * betamount);
      } else if (savedGame?.result === "WIN" && conditions == "EXACT") {
        savedGame.winamt = Number(4 * betamount);
      } else {
        savedGame.winamt = Number(0 * betamount);
      }
      savedGame.save();
      return savedGame;
    } catch (err) {
      console.log('err: ------save', err);
      return err;
    }
  }
}

module.exports = new GameService();
