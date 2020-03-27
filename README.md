# Rolldown

Rolldown is a personal project I created (during the coronavirus outbreak) that
simulates the act of "rolling down" in the video game [Teamfight Tactics (TFT)](https://na.leagueoflegends.com/en/featured/events/teamfight-tactics),
developed by Riot Games.

## Teamfight Tactics
For those who are not familiar, TFT is an "Autochess" game where 8 players each
start with a finite life total, and take turns dueling each other with
purchasable AI units. Each player accrues gold and EXP over time, which help
with obtaining and upgrading these units into a sizable army. These units each
have unique abilities and synergies, with 5 being randomly offered to the player
each round. Players are also given the option of spending gold to "roll" a new
set of 5 units. The game ends when only one player and their army is left
remaining.

One crucial and mechanically intensive portion of any game in TFT is a point
where the player must *"roll down"* all their gold- that is, spend a large portion
or even all of their gold to rapidly search for units that will strengthen their
army. Although this skill is very important (and challenging), it only happens
a few times per game, so players do not get many opportunities to train this
skill. To combat this issue, I developed Rolldown so players could specifically
practice this skill in a sandbox environment.

## How to Use

Rolldown's UI closely mimics that of the actual TFT Shop UI, and most of the
functionality is the same.

Champions can be purchased by clicking on their icons in the store, causing them
to appear on the board. These bought champions can then be clicked and shifted
around, swapped, or sold back to the store for gold. The buttons on the left side
of the UI can be used to purchase XP or rerolls. The gold and level fields can
also be manually set to a desired value.

The keyboard icon on the top right of the screen can be clicked to open or close
the keybind menu, where you can configure your keybinds to allow you to more
conveniently buy XP, reroll, or sell champions by hovering over them. Once the
keybind menu is open, simply click on the current binding (represented by keycode)
and enter the new desired binding.

## Built with Love

This was my first project with Javascript and React, and through a ton of
Googling, I learned a lot!
Here's a list of the frameworks/tools I used to build
Rolldown:

- React
- React-Bootstrap
- Font-Awesome
- [TFT Developer Portal Assets](https://developer.riotgames.com/docs/tft)

## Disclaimer

This project was intended for educational, non-monetary purposes and is in no
way affiliated with Riot Games or Teamfight Tactics. All intellectual properties
and assets belong to their respective owners. I'm grateful to Riot Games for
being supportive of their developers by releasing these assets, and also for
making my favorite games! :)
