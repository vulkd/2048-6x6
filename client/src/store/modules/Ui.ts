import * as types from '@/store/mutation-types';
import { IStorePayload, IStateUi } from '@/interfaces';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

const namespaced = true;

const state: IStateUi = {
  shouldUseDarkMode: false,
};

const actions: ActionTree<IStateUi, {}> = {
};

const mutations: MutationTree<IStateUi> = {
};

const getters: GetterTree<IStateUi, {}> = {
  shouldUseDarkMode: (state) => state.shouldUseDarkMode,
};

const storeModule: Module<IStateUi, {}> = {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};

export default storeModule;
