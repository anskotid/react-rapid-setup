module.exports = api => {
  api.cache(false);
  const presets = ['@babel/preset-env', '@babel/preset-react'];
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: false,
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
      },
    ],
  ];

  return {
    babelrc: false,
    presets,
    plugins,
    env: {
      development: {
        plugins: ['react-hot-loader/babel'],
      },
      test: {
        plugins: ['@babel/plugin-transform-modules-commonjs', 'react-hot-loader/babel'],
      },
    },
  };
};
