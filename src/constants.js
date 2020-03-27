export const XP_THRESH = [-1, -1, 2, 6, 10, 20, 32, 50, 66]
export const REROLL_ODDS = {
  2: [100, 0, 0, 0, 0],
  3: [70, 30, 0, 0, 0],
  4: [50, 35, 15, 0, 0],
  5: [35, 40, 20, 5, 0],
  6: [20, 35, 35, 10, 0],
  7: [14, 30, 40, 15, 1],
  8: [13, 20, 35, 25, 7],
  9: [10, 15, 25, 35, 15]
}
export const SELL_RATE = {
  1: [1, 3, 5],
  2: [2, 4, 6],
  3: [3, 5, 7],
  4: [4, 6, 8],
  5: [5, 7, 9]
}
export const CHAMPION_TOTAL_AMOUNT = {
  1: 29,
  2: 22,
  3: 16,
  4: 12,
  5: 10
}
export var KEYBINDS = [[65, "Buy XP"], [68, "Reroll"], [69, "Sell Champion"]];

const ChampionData = require("./json/champions.json");
export var championPool = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: []
};
ChampionData.forEach((champion) => {
  let cost = champion.cost;
  for(let i = 0; i < CHAMPION_TOTAL_AMOUNT[cost]; i++) {
    championPool[cost].push(champion);
  }
})
console.log(championPool[1]);
