# abcanvas

Command-Line Interface for building easy canvas prototype based on [wzrd](https://www.npmjs.com/package/wzrd).


## installation

```
npm install abcanvas -g
```

**note** that you must have a copy of `browserify` installed as well. It can be either local (preferred) or global.

```
npm install browserify --save
```

## usage

```
abcanvas setup
```

This setup the node modules and package.json for prototyping.

```
abcanvas create app.js 
```

This create the boilerplate js file for canvas animation app.


```
abcanvas app.js
```

This will start a local development server (default of `localhost:9966`) that serves all files in the current folder with the exception of `app.js`, which will be browserified instead.
