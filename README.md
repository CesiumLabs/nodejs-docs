# Node.js Docs
Node.js documentation parser

# Installation

```sh
$ npm install node.js-docs

```

# Example

```js
const docs = require("nodejs-docs");

docs.find("buffer", "v12.x")
    .then(data => {
        console.log(data.content)
    })
    .catch(console.error);

```

# API
## fetch(version, fetchOptions)
This method fetches & stores data in memory. This method is used by `find()`.
This method doesn't parse markdown content. If you want markdown contents, you have to use `find()` method.

### Params
- **version:** You can pass `node.js` version here. For example, `v12.x` will parse docs for v12.
- **fetchOptions:** You can supply fetch options here. Options type should be `object`. Example: `{ force: false, all: false }`. If `force` is set to `true`, it will forcefully parse docs again. If `all` is set to `true`, it will return whole cache instead of the given version.

## find(contentQuery, version)
This method parses actual data from the documentation. It returns a string of `markdown` which can be converted to html using packages like **[Showdown](https://npmjs.com/package/showdown)**.

### Params
- **contentQuery:** You can supply content qyery, generally `node.js`'s global/default module name.
- **version:** You can pass `node.js` version here.

# Join my discord
**[https://discord.gg/2SUybzb](https://discord.gg/2SUybzb)**