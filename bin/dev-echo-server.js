#!/usr/bin/env node

const { createServer } = require("../src/createServer");

createServer().catch(err => {
  console.log('dev-echo-server crashed');
  console.error(err);
  process.exit(1);
})
