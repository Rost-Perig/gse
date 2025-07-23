import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    height: {
      // body: 'calc(100% - 100px)',
      // header: '64px',
      // footer: '56px',
      // page: 'calc(100vh - 128px)',
      // layout: 'calc(100vh - 268px)',
      // rectangle: '8px',
      // logo: '18px'
    },
    // width: {
    //   screen: '100vw',
    //   halfScreen: '50vw',

    //   // searchBar: '200px',
    //   // page: '100vw',
    //   // partScreen: '30vw',
    //   // btn: '200px',
    //   // content: '45vw',
    //   full: '100%'
    // },
    maxWidth: {
      maxWidthSite: '1536px',
    },
    minHeight: {
      withoutFooter: 'calc(100vh - 40px)',
      minBox: '200px',
    },
    colors: {
      gray: {
        100: '#f7fafc',
        200: '#edf2f7',
        300: '#e2e8f0',
        400: '#cbd5e0',
        500: '#a0aec0',
        600: '#718096',
        700: '#4a5568',
        800: '#282930',
        900: '#1D2030',
      },
      bg: {
        primaryLight: '#E9D7FE',
        header: '#42307D',
        body: '#1B0027',
        button: '#9E77ED',
        footer: '#1B0027',
        switch: '#12B76A',
        white: 'rgba(255, 255, 255, 1)',
      },
      border: {
        // colorBorder: '#354239'
        // primary: '#42307D',
        // gray: {
        //   200: '#EAECF0',
        //   300: '#D0D5DD'
        // }
      },
      colorText: '#beae76',
      colorTextLight: 'rgb(177, 185, 172)',
      colorBorder: '#354239',
    },
  },
  plugins: [],
}
export default config

//=========================================================================================
