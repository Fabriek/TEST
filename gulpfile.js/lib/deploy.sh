#!/bin/bash
# Go into the public facing directory and create a *new* Git repo

PROJECT="$1"
DIRECTORY=public
USER=digital-prev
DOMAIN=preview.oliver.digital

if [ -d "$DIRECTORY" ];
then
  cd public
  ssh $USER@$DOMAIN "mkdir -p htdocs/$PROJECT" && scp -r . $USER@$DOMAIN:htdocs/$PROJECT/
  open http://$DOMAIN/$PROJECT/
else
  echo "Public directory does not exist!"
fi
