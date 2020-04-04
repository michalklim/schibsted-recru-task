module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions'],
          node: 'current',
        },
        modules: false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: ["@babel/plugin-transform-runtime"],
}
