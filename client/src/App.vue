<template>
  <div id="app" class='bg-gray-100 min-h-screen font-semibold subpixel-antialiased text-gray-800'>
    <main class='mx-auto w-2/3 clear-both md:p-10'>
      <GameGrid/>
      <!-- <GameChart/> -->
    </main>
    <Ui/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Ui from '@/components/Ui';
import GameGrid from '@/components/GameGrid.vue';
import GameChart from '@/components/GameChart.vue';

@Component({
  components: {
    Ui,
    GameGrid,
    GameChart,
  },
})
export default class App extends Vue {}
</script>
