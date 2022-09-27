import type { Directive } from 'vue';

export const vHasPermissionDirective: Directive = {
  mounted: (el) => {
    console.log(el);
  },
  updated: (el, binding) => {
    console.log(el, binding);
  },
};
