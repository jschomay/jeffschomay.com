#!/bin/sh

# compile views/index.jade to public/index.html
./node_modules/jade/bin/jade -P -O public/ views/index.jade 

# todo?
# compile and minify coffee scripts and stylus