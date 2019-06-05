module.exports = {
  start: 'parcel public/index.html',
  build: 'yarn build:clean && parcel build public/index.html',
  'build:clean': 'rm -rf dist && mkdir dist && cp -r public/assets dist/',
  test: 'jest src --env=jsdom --watchAll=false',
};
