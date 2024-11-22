#!/bin/bash

for file in "$@"; do
  # jj -u -i "$file" -o "$file" && echo "" >>"$file"
  echo "Minifying $file"
  node-minify --compressor jsonminify --input "$file" --output "$file" && echo "" >>"$file"
done
