import FlagCard from '@/components/FlagCard.vue';
import { shallowMount } from '@vue/test-utils';

describe('FlagCard.vue', () => {
    it('should render country info', () => {
        const wrapper = shallowMount(FlagCard, {
            propsData: {
                country: {
                    name: 'France'
                }
            }
        });
        expect(wrapper.text()).toContain('France');
    });
});
