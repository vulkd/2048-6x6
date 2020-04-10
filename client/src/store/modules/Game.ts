import Vue from 'vue';
import * as types from '@/store/mutation-types';
import { IStorePayload, IStateGame, IGameCell, DirectionType } from '@/interfaces';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import {
  randInt,
  createMatrix,
  fillRandomEmptyCellInMatrix,
  rotateMatrixWithRegardToVector,
  shiftColumnsInRow,
} from '@/lib/helpers';

const namespaced = true;

const defaultState = (size: number): IStateGame => {
  let grid = createMatrix(size);
  grid = fillRandomEmptyCellInMatrix(grid, 1);
  if (Math.random() <= 0.33) {
    grid = fillRandomEmptyCellInMatrix(grid, 2);
  }
  return {
    grid,
    playerTurn: 0,
  };
};

const state: IStateGame = defaultState(6);

const actions: ActionTree<IStateGame, {}> = {
  init: ({ commit, state }, value: number) => {
    commit({
      type: types.SET_GAME_INIT,
      value: defaultState(value || state.grid.length),
    });
  },
  // setCell: ({ commit }, value: IGameCell) => {
  // },
  shiftGrid: ({ commit, state, dispatch }, dir: DirectionType ) => {
    let grid = JSON.parse(JSON.stringify(state.grid));
    let score = 0;

    // Rotate grid depending on vector direction so we only operate on rows
    grid = rotateMatrixWithRegardToVector(grid, dir);

    let shouldCreateNewCell = false;

    // @todo turn into pure testable function:
    const mergeColumnsInRow = (row: [IGameCell]): [IGameCell] => {
      for (let colIdx = row.length - 1; colIdx >= 1; colIdx--) {
        const cell = row[colIdx];
        const nextCell = row[colIdx - 1];
        if (cell.value === nextCell.value) {
          row[colIdx].value *= 2;
          row[colIdx - 1].value = 0;
          shouldCreateNewCell = true;
          score += row[colIdx].value;
        }
      }
      return row;
    };

    // Start from last col in each row to reflect desired slide behaviour
    // Combine and then slide
    for (let rowIdx = 0; rowIdx < grid.length; rowIdx++) {
      grid[rowIdx] = shiftColumnsInRow(grid[rowIdx]);
      grid[rowIdx] = mergeColumnsInRow(grid[rowIdx]);
      grid[rowIdx] = shiftColumnsInRow(grid[rowIdx]);
    }

    // Rotate grid back to original position
    grid = rotateMatrixWithRegardToVector(grid, dir, true);

    // Create new cell
    if (shouldCreateNewCell) {
      const newCellValue = Math.random() <= 0.8 ? 1
        : Math.random() <= 0.9 ? 2
        : -1;
      grid = fillRandomEmptyCellInMatrix(grid, newCellValue);
    }

    // @todo refactor actions to reduce number of mutations per action
    commit({
      type: types.SET_GAME_GRID,
      value: grid,
    });
    dispatch('Players/incrementScore', {
      playerTurn: state.playerTurn,
      score,
    }, { root: true });
    dispatch('setPlayerTurn', state.playerTurn);
  },
  setPlayerTurn: ({ commit, rootState }, currentPlayerTurn: number) => {
    const totalPlayers = rootState.Players.players.length;
    const value = currentPlayerTurn === totalPlayers - 1
      ? 0
      : currentPlayerTurn + 1;
    commit({
      type: types.SET_GAME_PLAYER_TURN,
      value,
    });
  },
};

const mutations: MutationTree<IStateGame> = {
  [types.SET_GAME_INIT](state, payload: IStorePayload) {
    state = Object.assign(state, payload.value);
  },
   [types.SET_GAME_GRID](state, payload: IStorePayload) {
    state.grid = JSON.parse(JSON.stringify(payload.value));
   },
   [types.SET_GAME_PLAYER_TURN](state, payload: IStorePayload) {
    state.playerTurn = payload.value;
   },
};

const getters: GetterTree<IStateGame, {}> = {
  grid: (state) => state.grid,
  gridSize: (state) => state.grid.length,
  playerTurn: (state) => state.playerTurn,
  totalTurns: (state, getters, rootState) => {
    return rootState.Players.players
      .map(({ totalTurns }) => totalTurns)
      .reduce((acc: number, cur: number) => acc + cur);
  },
  scores: (state, getters, rootState) => {
    return rootState.Players.players.map(({ score }) => score);
  },
};

const storeModule: Module<IStateGame, {}> = {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};

export default storeModule;
