const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
    prefix: '',
    mode: 'jit',
    purge: {
      content: [
        './src/**/*.{html,ts,css,scss,sass,less,styl}',
      ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        transformOrigin: {
          "0": "0%",
        },
      },
    },
    variants: {
      extend: {borderColor: ["responsive", "hover", "focus", "focus-within"]},
    },
    plugins: [],
};
