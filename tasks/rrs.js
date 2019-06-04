const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const program = require('commander');

const { dependencies, devDependencies } = require('../dependencies');

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

program
  .option('--title <type>', 'project title')
  .option('-r, --no-router', 'without react-router');

program.parse(process.argv);

const directoryName = program.title;
if (!directoryName) handleError('The --title argument is required');

const directory = path.join(rootDir, directoryName);

fs.mkdirSync(directory);

cp.execSync('npm init', { cwd: directory, stdio: 'inherit' });

const packageJsonDir = path.join(directory, 'package.json');
// eslint-disable-next-line import/no-dynamic-require
const packageJson = require(path.join(directory, 'package.json'));

packageJson.dependencies = dependencies;
packageJson.devDependencies = devDependencies;

console.log('router', program.noRouter);
console.log();

if (program.noRouter) delete packageJson.dependencies['react-router-dom'];

fs.writeFileSync(packageJsonDir, JSON.stringify(packageJson, null, 2), 'utf8');

cp.execSync('npm install', { cwd: directory, stdio: 'inherit' });

const packageLockDir = path.join(directory, 'package-lock.json');

if (fs.existsSync(packageLockDir)) fs.unlinkSync(packageLockDir);

console.log('Copy template files...');
console.log();

const templateDir = path.join(rootDir, 'template');
const templateFiles = fs.readdirSync(templateDir);

templateFiles.forEach(fileName => {
  fs.copyFileSync(path.join(templateDir, fileName), path.join(directory, fileName));
});

fs.mkdirSync(path.join(directory, 'src'));

console.log('Finished!');
