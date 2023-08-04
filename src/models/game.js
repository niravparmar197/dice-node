const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const randomizer = require('../helpers/randomizer')

const GameSchema = Schema({
  dice1: { type: Number, default: 0},
  dice2: { type: Number, default: 0},
  betamt:{type: Number, default:0},
  conditions:{type: String},
  winamt:{type: Number, default:0},
  result: { type: String, default: 'TBD'}
}, {
  versionKey: false
});

GameSchema.statics.runGame = function() {
    return randomizer();
}

GameSchema.methods.getScore = async function(conditions) {
   console.log('conditions:----- ', conditions);
   try {
      let sumNum = this.dice1 + this.dice2;
      console.log('sumNum: ', sumNum);
      if (sumNum == 7 &&conditions=='EXACT') {
         this.result= 'WIN'
         return this;
      }else if (sumNum > 7 && conditions=='GREATER_THEN_SEVEN') {
         this.result= 'WIN'
         return this;
      }else if (sumNum < 7 && conditions=='LESS_THEN_SEVEN') {
         this.result= 'WIN'
         return this;
      } else {
         this.result= 'LOST'
         console.log('this.result: ', this.result);
         return this;
      }
   } catch(err) { return err }

}
//Exporting Game model based on GameSchema
module.exports= mongoose.model('Game',GameSchema);
