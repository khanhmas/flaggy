import FlagCard from '@/components/FlagCard.vue';
import FlagLabelInfo from '@/components/FlagLabelInfo.vue';
import { shallowMount, VueWrapper } from '@vue/test-utils';

import { initLabelValues } from '@/utils/utils';
jest.mock('@/utils/utils');

const mockedUInitLabelValues = <jest.Mock<typeof initLabelValues>>(
    (initLabelValues as any)
);

describe('FlagCard.vue', () => {
    let wrapper: VueWrapper<any>;
    beforeEach(() => {
        mockedUInitLabelValues.mockClear();
        mockedUInitLabelValues.mockImplementation((): any => [
            {
                population: 1,
            },
        ]);
        /**
         * shallowMount literally create the component, so it will execute all necessary
         * component's life cycle hooks behind the scenes.
         * So, it is necessary to mock the external function's implementation before shallowMount
         */
        wrapper = shallowMount(FlagCard, {
            propsData: {
                country: {
                    name: 'France',
                    flag: 'fra.svg',
                },
            },
        });
    });

    it('should generate label values', () => {
        expect(wrapper.vm.labelValues).toEqual([
            {
                population: 1,
            },
        ]);
    });

    it('should render country info', () => {
        expect(wrapper.text()).toContain('France');
        expect(wrapper.find('img[src="fra.svg"]').exists()).toBe(true);
        expect(wrapper.find('h2[title="France"]').exists()).toBe(true);

        const flagLabelInfo: VueWrapper<any> = wrapper.findComponent(
            FlagLabelInfo
        );
        expect(flagLabelInfo.exists()).toBe(true);
        console.log(wrapper.vm.labelValues);
        /**
         * This is used to executed the created hook in the FlagCard component
         */
        // FlagCard.created!.call(wrapper.vm);
    });
});
