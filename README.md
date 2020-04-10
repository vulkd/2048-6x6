# 2048


## Usage
 - `./start_2048.sh`
 - [http://127.0.0.1:8080](http://127.0.0.1:8080)

## Todo
 - Some Vue/Typescript errors (eg; no type for VueX' 'rootState' object)
 - player module seperate to seperate concerns (ie; if implement ping, nickname, etc per player, and to allow players to have multiple games)
 - add mode where each nwe block belongs to that player (differrentiate with border colour and svg background) and if merged by another player removes points from the block owner and/or gives double points for x/turns.
 - keep track of score
 - keep track of turns
 - keep track of blocks that have been on the board (graph?)
 - customizable number of cells / rows
 - click to add wall block
 - players get items etc.
 - redo UI
 - leaderboard
 - add sounds, merge, and transform() animations
 - add swipe gestures
 - add i8ln
 - add offline support with service worker
 - add dark mode
 - add multiplayer w/ websockets
 - look into webrtc applications
 - add chat
 - cubed 2048?
 - player gets random chance to add obstacle ech turn
 - every X rounds add bombs that decrease score and destroy blocks
