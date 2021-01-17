import { DirectiveBinding } from 'vue';

export default {
    mounted(el: HTMLElement, binding: DirectiveBinding): void {
        /**
         * binding.instance references to the "Component" using this directive
         * so, use binding.instance?.$store to have access to Vuex store
         */
        const mapCodeName: { [key: string]: string } = <any>binding.arg;
        el.textContent = mapCodeName[binding.value];
        el.parentElement!.setAttribute('title', el.textContent);
    },
};
