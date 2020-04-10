<template>
  <div ref='gridCell' class='grid-cell p-2 select-none w-full h-full relative'>
    <div
    class='border-b-4 border-75 flex items-center justify-center w-full h-full rounded-lg text-white font-mono text-xxs md:text-base lg:text-2xl'
    :style='cellStyle'
    @click='cell.value <= 0 ? onCellClick : () => {}'
    >
    {{ cell.value > 0 ? cell.value : '' }}
    </div>
</div>
</template>

<script lang="ts">
import hashColor from '@/lib/hashColor';
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { IGameCell } from '@/interfaces';

// @credit https://www.heropatterns.com/
const cellStyleBrick = {
  'background-image': `url("data:image/svg+xml,%3Csvg width='21' height='22' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='white' fill-opacity='0.5' %3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  'background-color': '#658383',
};
const cellStyleColor = (value: number) => ({
  'background-color': hashColor(value ** 10, {
    h: [0, value ** 10],
    s: [70, 70 + value * .5],
    mod: 2,
  }),
});
const cellStyleEmpty = {
  'background-color': '#b3cece',
};

@Component({
  computed: {
    cellStyle() {
      return this.cell.value < 0 ? cellStyleBrick
        : this.cell.value ? cellStyleColor(this.cell.value)
        : cellStyleEmpty;
    },
  },
})
export default class GameGrid extends Vue {
  @Prop({ required: true }) private cell: IGameCell;

  @Watch('cell.value')
  public onCellValueChange(value: number) {
    // console.log(value);
  }

  public onCellClick() {
    this.$store.dispatch('Game/toggleCellObstacle', {
      ...this.cell,
      value: -1,
    });
  }
}
</script>

<style scoped>
  .grid-cell {
    transition-duration: 1s;
    transition-property: transform;
    transition-timing-function: ease;
  }
</style>
