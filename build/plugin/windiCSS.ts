import WindiCSS from 'vite-plugin-windicss';

export default function windiCSS() {
  return WindiCSS({
    config: {
      preflight: true,
      // exclude: [RegExp('node_modules'), RegExp('.git')],
      theme: {
        spacing: {
          sm: '8px',
          md: '16px',
          lg: '24px',
          xl: '48px',
        },
        borderRadius: {
          none: '0',
          sm: '0.125rem',
          // DEFAULT: '0.25rem',
          DEFAULT: '4px',
          md: '0.375rem',
          lg: '0.5rem',
          full: '9999px',
          large: '12px',
        },
      },
      // extract: {
      //   include: ['index.html', 'src/**/*.{vue,html,jsx,tsx}'],
      //   exclude: ['node_modules/**/*', '.git/**/*'],
      // },
    },
    scan: {
      include: ['.'],
    },
  });
}
