import WindiCSS from 'vite-plugin-windicss';

export default function windiCSS() {
  return WindiCSS({
    config: {
      preflight: true,
      // exclude: [RegExp('node_modules'), RegExp('.git')],
    },
    scan: {
      include: ['.'],
    },
  });
}
