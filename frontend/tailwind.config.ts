import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9eeff',
          500: '#0f7ae5',
          600: '#0c5ebc',
          900: '#0d1b2a'
        },
        success: '#1eb980',
        warning: '#ffb703',
        danger: '#ef476f'
      },
      boxShadow: {
        soft: '0 18px 48px rgba(15, 26, 35, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
