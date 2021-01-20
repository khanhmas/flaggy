import { DirectiveBinding } from 'vue';

export default {
    mounted(el: HTMLElement, binding: DirectiveBinding): void {
        let value: any = binding.value;
        /**
         * Check value is instanceof Array before parseFloat will parse the first element
         * into Float if possible
         */
        if (value instanceof Array) {
            value = value.join(', ');
        } else if (isNaN(parseFloat(value)) === false) {
            value = Number(value).toLocaleString();
        }
        el.textContent = value;
        el.setAttribute('title', value);
    },
};
