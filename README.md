# React Rapid Setup

> create a basic setup in seconds and start to code!

Offered out of the box:
- react 
- redux
- react-router
- parcel
- jest
- eslint
- prettier
- babel

## Using

```bash
npx react-rapid-setup --title=my-app

cd my-app
yarn start
```

- You can opt-out react-router by passing `` -r ``
- You can opt-out redux by passing `` -x ``

## Prerequisites

Yarn

## Folder structure

Check here: https://github.com/anskotid/react-rapid-setup/tree/master/template

## Frequently Asked Questions

### Why do I get both .babelrc and babel.config.js??

Unfortunately, Parcel doesn't support babel.config.js yet, so both are needed (babel.config.js is used by Jest).
