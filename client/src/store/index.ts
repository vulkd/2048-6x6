import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import Ui from '@/store/modules/Ui';
import Game from '@/store/modules/Game';
import Players from '@/store/modules/Players';

Vue.use(Vuex);

const modules = {
  Ui,
  Game,
  Players,
};

const store: StoreOptions<{}> = {
  modules,
  strict: process.env.NODE_ENV !== 'production',
};

export default new Vuex.Store<{}>(store);
