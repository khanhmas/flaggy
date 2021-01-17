import { DirectiveBinding } from 'vue';

export default {
    mounted(el: HTMLElement, binding: DirectiveBinding): void {
        let label: string = binding.arg as string;
        const value: any = binding.value;
        if (value instanceof Array && typeof binding.arg === 'string') {
            if (value.length > 1) {
                if (label[label.length - 1] === 'y') {
                    label = label.substring(0, label.length - 1) + 'ies';
                } else label = label + 's';
            }
        }
        el.textContent = label + ': ';
    }
}