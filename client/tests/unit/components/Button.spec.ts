import { shallowMount } from '@vue/test-utils';
import Button from '@/components/Button.vue';

describe('Button.vue', () => {
  it('renders default slot', () => {
    const wrapper = shallowMount(Button, {
      slots: {
         default: 'Foo',
       },
    });
    expect(wrapper.text()).toMatch('Foo');
  });
  it('sets type attribute via prop', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        type: 'submit',
      },
    });
    expect(wrapper.attributes('type')).toBe('submit');
  });
});
