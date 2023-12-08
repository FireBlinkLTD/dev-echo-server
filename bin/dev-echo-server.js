#!/usr/bin/env node
const { createServer } = require("../src/createServer");

createServer().catch(err => {
  console.error(err);
  process.exit(1);
})
