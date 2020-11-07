import replace from "@rollup/plugin-replace";
import nodeResolve from "@rollup/plugin-node-resolve";
import serve from 'rollup-plugin-serve';
import vuePlugin from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
import commonjs from '@rollup/plugin-commonjs';

const isDev = process.env.NODE_ENV === 'development';

const plugins = [
  nodeResolve(),
    vuePlugin({ css: false }),
  commonjs(),
    css(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),

];

if(isDev) {
  plugins.push(
    serve({
      contentBase: './dist',
      port: '9001',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
  );
}

export default {
  input: "src/index.js",
  output: {
    name: 'product',
    file: "dist/product.min.js",
    format: "iife",
    globals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter'
    }
  },
  plugins,
  external: ['vue','vue-router']
};
