import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import globals from 'rollup-plugin-node-globals'
import { uglify } from 'rollup-plugin-uglify'
import pkg from '../package.json'

export default config => ({
  input: './src/main.js',
  output: {
    file: config.file,
    format: config.format,
    name: pkg.name,
    globals: {
      // jquery: '$'   Object 形式的 id: name 键值对，用于umd/iife包。告诉 Rollup jquery 模块的id等同于 $ 变量
    }
  },
  plugins: [
    resolve({
      // 将自定义选项传递给解析插件
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    replace({ 'process.browser': config.browser }),
    commonjs(),
    globals(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    config.uglify && uglify() // 压缩代码
  ],
  // 指出应将哪些模块视为外部模块,Peer dependencies
  external: []
})
