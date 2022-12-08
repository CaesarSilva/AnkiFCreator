import resolve from "rollup-plugin-node-resolve";
import nodePolyfills from 'rollup-plugin-polyfill-node';
import browserifyPlugin from 'rollup-plugin-browserify-transform';
import replace from '@rollup/plugin-replace';
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";
// Error: 'default' is not exported by node_modules/node-base91/index.js, imported by src/Deck.js
import base91 from "node-base91";
//console.log(Object.keys);
export default [
  {
    input: "src/index.js", // your entry point
    output: {
      name: "AnkiFCreator", // package name
      file: pkg.browser,
      format: "umd",
    },
    plugins: [      
      resolve({ browser: true }),      
      commonjs(),      
      babel({
        include: ["node_modules/**"],
      }),
      
    ],
  },
  {
    input: "src/index.js", // your entry point
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: [
      babel({
        exclude: ["node_modules/**"],
      }),
    ],
  },
];