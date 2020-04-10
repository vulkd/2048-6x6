import Vue from 'vue';
import * as types from '@/store/mutation-types';
import { IStorePayload, IStatePlayers } from '@/interfaces';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

const namespaced = true;

const defaultState = (playerCount: number = 2): IStatePlayers => {
  return {
    players: Array(playerCount).fill(null).map((i) => ({
      score: 0,
      totalTurns: 0,
      blockCounts: {}, // @todo individual block size tally to chart
    })),
  };
};

const state: IStatePlayers = defaultState();

const actions: ActionTree<IStatePlayers, {}> = {
  init: ({ commit }, value: number) => {
    commit({
      type: types.SET_PLAYER_INIT,
      value: defaultState(value || 2),
    });
  },
  incrementScore: ({ commit, state }, value: any) => {
    commit({
      type: types.INCREMENT_PLAYER_SCORE,
      value,
    });
  },
  incrementBlockCount: ({ commit, state }, value: any) => {
    commit({
      type: types.INCREMENT_PLAYER_BLOCK_COUNT,
      value,
    });
  },
};

const mutations: MutationTree<IStatePlayers> = {
  [types.SET_PLAYER_INIT](state, payload: IStorePayload) {
    Vue.set(state, 'players', payload.value.players);
  },
  [types.INCREMENT_PLAYER_SCORE](state, payload: IStorePayload) {
    state.players[payload.value.playerTurn].totalTurns += 1;
    if (payload.value.score) {
      state.players[payload.value.playerTurn].score += payload.value.score;
    }
  },
  [types.INCREMENT_PLAYER_BLOCK_COUNT](state, payload: IStorePayload) {
    const k = payload.value.blockNum;
    const v = state.players[payload.value.playerTurn].blockCounts[payload.value.blockNum];
    Vue.set( state.players[payload.value.playerTurn].blockCounts, k, v + 1);
  },
};

const getters: GetterTree<IStatePlayers, {}> = {
  players: (state) => state.players,
};

const storeModule: Module<IStatePlayers, {}> = {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};

export default storeModule;
