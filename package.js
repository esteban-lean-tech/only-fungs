#!/usr/local/bin/node

const { inlineSource } = require("inline-source");
const fs = require("fs");
const path = require("path");
const htmlpath = path.resolve("./build/index.html");

inlineSource(htmlpath, {
  compress: true,
  attribute: false,
  rootpath: path.resolve('build'),
  // Skip all css types and png formats
  ignore: ["png", "ico"],
})
  .then((html) => {
    fs.writeFileSync("./build/index.packaged.html", html);
  })
  .catch((err) => {
    console.log(err);
    exit(1);
  });
