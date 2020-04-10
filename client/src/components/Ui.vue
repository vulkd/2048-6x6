<template>
  <div class='mx-auto w-full text-center'>
    <div class='flex justify-center'>
      <!-- @todo create consistent UI for up to 4 players -->
      <div
      v-for='player,idx in players'
      :key='idx'
      :style='{ "background-color": hashColor((idx + 1) * -10, { l: [80, 90] }), "border-color": hashColor((idx + 1) * -10) }'
      class='relative text-center m-2 border-2 rounded-lg text-xs sm:text-base inline-block p-4 border-2'
      :class='{ "activePlayer": idx === playerTurn }'
      @click='onClickPlayer'
      >
      <div>Player {{ idx + 1 }}</div>
      <div>{{ player.score }}</div>
    </div>
    <div
      v-if='players.length < 4'
      class='relative text-center m-2 border-2 rounded-lg text-xs sm:text-base inline-block p-4 border-2 flex items-center cursor-pointer hover:opacity-50'
      @click='onClickAddPlayer'
    >
      +
    </div>
  </div>

    <div class='mx-auto flex justify-between items-center max-w-sm py-2'>
      <Button class='w-1/3' @click='onClickNewGame'>New Game</Button>
      <div class='w-1/3'>
        Grid Size:
        <span @click='onClickNewGame({ gridSize: gridSize + 1 })' class='cursor-pointer'>👆</span>
        <span @click='onClickNewGame({ gridSize: gridSize > 3 ? gridSize - 1 : 3 })' class='cursor-pointer'>👇</span>
      </div>
      <div class='w-1/3'>Turns: {{ totalTurns }}</div>
    </div>
</div>
</template>

<script lang="ts">
import hashColor from '@/lib/hashColor';
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Button from '@/components/Button';

@Component({
  components: {
    Button,
  },
  computed: {
    ...mapGetters({
      scores: 'Game/scores',
      playerTurn: 'Game/playerTurn',
      totalTurns: 'Game/totalTurns',
      gridSize: 'Game/gridSize',
      players: 'Players/players',
    }),
  },
})
export default class Ui extends Vue {
  // @todo created computed 'Players' property instead of doing all the work in the template
  public hashColor = hashColor;

  public onClickNewGame(opts= {}) {
    if (confirm('Begin new game?')) {
      this.$store.dispatch('Players/init', opts.playerCount || this.players.length);
      this.$store.dispatch('Game/init', opts.gridSize || this.gridSize);
    }
  }

  public onClickPlayer() {
    this.onClickNewGame({ playerCount: this.players.length - 1 });
  }

  public onClickAddPlayer() {
    this.onClickNewGame({ playerCount: this.players.length + 1 });
  }
}
</script>

<style scoped>
.activePlayer:before {
  content: '👇';
  user-select: none;
  pointer-events: none;
  position: absolute;
  top: -1rem;
  left: calc(50% - 1rem);
  font-size: 2rem;
}
</style>