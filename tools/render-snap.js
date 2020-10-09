#!/usr/bin/env node

if (process.argv.length !== 3) {
  console.log(process.argv);
  throw 'Script requires a single argument--the snapshot file path';
}

let snapFile = process.argv[2];
if (!snapFile.endsWith('.snap')) {
  throw 'Snapshot file must when with ".snap"';
}

if (!(snapFile.startsWith('/') || snapFile.startsWith('.'))) {
  snapFile = '../' + snapFile;
}

function unescapeSlashes(str) {
  return str.replace(/\"/g, '').replace(/\\/g, '"');
}

const snaps = require(snapFile);
const snap1 = Object.values(snaps)[0];
console.log(unescapeSlashes(snap1));
