import { DirectiveBinding } from 'vue';

export default {
    mounted(el: HTMLElement, binding: DirectiveBinding): void {
        const queryParams: Array<string> = Object.entries<string>(<any>binding.arg).map(
            ([key, value]: [string, string]) => {
                return [key, value].join('=');
            }
        );
        el.setAttribute('href',`${binding.value}?${queryParams.join('&')}`);
    },
};
