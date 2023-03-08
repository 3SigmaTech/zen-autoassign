#!/usr/bin/env bash

FILENM='./build/package/assets/ticket-assigner.html'
FIND="http:\/\/localhost:3000\/build\/(.*)\\.js"
SUBS=".\/\1.min.js"

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i "" -E "s/$FIND/$SUBS/g" $FILENM
else
  sed -i -E "s/$FIND/$SUBS/g" $FILENM
fi

FILENM='./build/package/manifest.json'
FIND="http:\/\/localhost:3000\/"
SUBS=""

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i "" -E "s/$FIND/$SUBS/g" $FILENM
else
  sed -i -E "s/$FIND/$SUBS/g" $FILENM
fi
