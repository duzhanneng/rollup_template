import config from './rollup.base'
import pkg from '../package.json'

export default config({
  format: 'umd',
  file: `lib/${pkg.name}.umd.js`,
  browser: true
})
