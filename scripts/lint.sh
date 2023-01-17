#!/bin/sh

set -x +e

CHANGED_FILES=$(git diff 97b7ed82efb449c1e127e8961c03a543265cc0cf...588175ada06ce6fa6e4187631957ff103223e1a1 --name-only --diff-filter=ACM | grep ".jsx\{0,1\}$")
if [[ "$CHANGED_FILES" = "" ]]; then
  echo "No changes"
  exit 0
fi

PASS=true

for FILE in $CHANGED_FILES
do
  "./node_modules/.bin/eslint" "$FILE"
  if [[ "$?" == 0 ]]; then
    echo "\033[32mESLint Passed: $FILE\033[0m\n"
  else
    echo "\033[41mESLint Failed: $FILE\033[0m\n"
    PASS=false
  fi
done

if ! $PASS; then
  echo "Please fix the ESLint errors and try again.\n"
  exit 1
else
  echo "Passed"
fi

exit $?