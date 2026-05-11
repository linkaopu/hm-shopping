module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 👇 把 vant 插件放在这里
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
