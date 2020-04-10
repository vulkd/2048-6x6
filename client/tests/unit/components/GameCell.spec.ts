import { shallowMount } from '@vue/test-utils';
import GameCell from '@/components/GameCell.vue';
import hashColor from '@/lib/hashColor';

describe('GameCell.vue', () => {
  it('renders empty cell', () => {
    const wrapper = shallowMount(GameCell, {
      propsData: {
        cell: { row: 0, col: 0, value: -1 },
      },
    });
    expect(wrapper.text()).toMatch('');
  });
  it('renders filled cell', () => {
    const wrapper = shallowMount(GameCell, {
      propsData: {
        cell: { row: 0, col: 0, value: 1 },
      },
    });
    expect(wrapper.text()).toMatch('1');
  });
  it('renders obstacle cell', () => {
    const wrapper = shallowMount(GameCell, {
      propsData: {
        cell: { row: 0, col: 0, value: -1 },
      },
    });
    expect(wrapper.text()).toMatch('');
  });
});
