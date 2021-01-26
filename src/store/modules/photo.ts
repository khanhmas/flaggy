import { PhotoState } from '@/store/states/photo';
import mutations from '@/store/mutations/photo';
import actions from '@/store/actions/photo';
import getters from '@/store/getters/photo';

const state: PhotoState = {
    photos: {},
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
