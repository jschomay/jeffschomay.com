#!/bin/sh

# compile views/index.jade to public/index.html
`npm bin`/jade -P -o docs/ views/index.jade

# css and coffee get built into views/ when running node server
