<template>
  <div class='game-grid w-full relative mx-auto'>
    <div class='absolute inset-0 w-full h-full font-bold subpixel-antialiased'>
     <div
       v-for='row, rowIdx in gridSize'
       :key='rowIdx'
       class='flex flex-shrink-0'
       :style='{ height: `${100 / gridSize}%` }'
     >
     <GameCell
       v-for='col, colIdx in gridSize'
       :key='colIdx'
       :cell='grid[rowIdx][colIdx]'
       :style='{ width: `${100 / gridSize}%` }'
     ></GameCell>
   </div>
 </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import GameCell from '@/components/GameCell.vue';

@Component({
  components: {
    GameCell,
  },
  computed: {
    ...mapGetters({
      grid: 'Game/grid',
      gridSize: 'Game/gridSize',
    }),
  },
})
export default class GameGrid extends Vue {
  public created() {
    this.$store.dispatch('Game/init', this.gridSize);
    window.addEventListener('keydown', this.onKeydown);
  }
  public beforeDestroy() {
    window.removeEventListener('keydown', this.onKeydown);
  }
  public onKeydown(e: KeyboardEvent) {
    const dir = e.keyCode === 37 ? 'l'
    : e.keyCode === 38 ? 'u'
    : e.keyCode === 39 ? 'r'
    : e.keyCode === 40 ? 'd'
    : null;
    if (dir) {
      this.$store.dispatch('Game/shiftGrid', dir);
    }
  }
}
</script>

<style scoped>
.game-grid {
  padding-top: 100%;
}
</style>
