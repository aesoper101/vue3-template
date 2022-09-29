import type { Directive } from 'vue';
import { hasPermission } from '@/utils/permission';

export const vHasPermissionDirective: Directive = {
  mounted: (el: Element, binding) => {
    const { value } = binding;
    if (!value) return;
    if (!hasPermission(value)) {
      el.parentNode?.removeChild(el);
    }
  },
  // updated: (el, binding) => {
  //   console.log(el, binding);
  // },
};
