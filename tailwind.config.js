module.exports = {
  // content: ["./src/**/*.{html,js}"],
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'  
  theme: {
  	fontFamily: {
  	  'body': ['Helvetica Neue', 'Helvetica', 'Arial', 'NotoSansTC', 'sans-serif']
  	},  	
    extend: {},
  },
  variants: {
    extend: {},
  },  
  plugins: [],
}
