#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const fse = require('fs-extra');
const program = require('commander');
const replace = require('replace-in-file');

const { dependencies, devDependencies } = require('../dependencies');
const scripts = require('../scripts');

const handleExit = () => {
  // eslint-disable-next-line no-undef
  cleanup();
  console.log('Exiting without error.');
  process.exit();
};

const handleError = e => {
  console.error('ERROR! An error was encountered while executing');
  console.error(e);
  // cleanup();
  console.log('Exiting with error.');
  process.exit(1);
};

process.on('SIGINT', handleExit);
process.on('uncaughtException', handleError);

console.log('Starting...');
console.log();

const rootDir = path.join(__dirname, '..');

let projectName;

program
  .arguments('<project-directory>')
  .usage('<project-directory> [options]')
  .option('-r, --not-router', 'without react-router')
  .option('-x, --not-redux', 'without redux')
  .action(name => {
    projectName = name;
  });

program.parse(process.argv);

if (typeof projectName === 'undefined') {
  handleError('Please specify the project directory.');
}

const directory = path.resolve(projectName);

fse.mkdirsSync(directory);

cp.execSync('yarn init', { cwd: directory, stdio: 'inherit' });

const packageJsonDir = path.join(directory, 'package.json');
// eslint-disable-next-line import/no-dynamic-require
const packageJson = require(path.join(directory, 'package.json'));

packageJson.dependencies = dependencies;
packageJson.devDependencies = devDependencies;
packageJson.scripts = scripts;

if (program.notRouter) delete packageJson.dependencies['react-router-dom'];
if (program.notRedux) {
  delete packageJson.dependencies.redux;
  delete packageJson.dependencies['react-redux'];
  delete packageJson.dependencies['redux-thunk'];
}

if (!program.notRouter) {
  packageJson.alias = {
    'react-dom': '@hot-loader/react-dom',
  };
}

fse.outputFileSync(packageJsonDir, JSON.stringify(packageJson, null, 2), 'utf8');

cp.execSync('yarn', { cwd: directory, stdio: 'inherit' });

console.info('Copy template files...');
console.log();

const templateDir = path.join(rootDir, 'template');

const templateFiles = fs.readdirSync(templateDir);

templateFiles.forEach(fileName => {
  fse.copySync(path.join(templateDir, fileName), path.join(directory, fileName));
});

if (program.notRouter) {
  fse.removeSync(path.join(directory, 'src/routes.js'));

  try {
    replace.sync({
      files: path.join(directory, 'src/App.js'),
      from: [
        /import { Route, Switch, BrowserRouter } from 'react-router-dom';/g,
        /import routes from '.\/routes';/g,
        /(<BrowserRouter>.*?<\/BrowserRouter>)/gs,
      ],
      to: ['', 'import Home from "./pages/Home";', '<Home />'],
    });
  } catch (error) {
    handleError(error);
  }
}

if (program.notRedux) {
  fse.removeSync(path.join(directory, 'src/redux'));

  try {
    replace.sync({
      files: path.join(directory, 'src/index.js'),
      from: [
        /import { Provider as ReduxProvider } from 'react-redux';/g,
        /<ReduxProvider store={store}>/g,
        /<\/ReduxProvider>/g,
        /import store from '.\/redux';/g,
      ],
      to: ['', '', '', ''],
    });
  } catch (error) {
    handleError(error);
  }
}

cp.execSync(
  `${path.join('node_modules/prettier/bin-prettier.js')} --write ${'src/**/*.js'}`,
  { cwd: directory },
);

console.log('Finished!');
