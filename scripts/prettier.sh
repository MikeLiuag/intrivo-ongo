#!/bin/sh

set +e

CHANGED_FILES=$(git diff 70c2e1838c8a1b14f548ec6a5991b97ee2c56458...a71ba991aeecb9a03088b2ec37cea02799909d04 --name-only --diff-filter=ACM | grep -E ".(js|jsx|json)$")
if [[ "$CHANGED_FILES" = "" ]]; then
  echo "No changes"
  exit 0
fi

PASS=true

for FILE in $CHANGED_FILES;
do
  "./node_modules/.bin/prettier" -c "$FILE"
  if [[ "$?" == 0 ]]; then
    echo "\033[32mPrettier: $FILE\033[0m\n"
  else
    echo "\033[41mPrettier: $FILE\033[0m\n"
    PASS=false
  fi
done

if ! $PASS; then
  echo "Please run prettier on failed files and try again.\n"
  exit 1
else
  echo "Passed"
fi

exit $?