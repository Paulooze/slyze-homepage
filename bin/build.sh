#!bin/bash

PROJECT="freshit-services"
APPNAME="slyze-fe"
BRANCH=$(git name-rev --name-only HEAD)

echo $NCI_PROJECT_NAME
echo $NCI_BUILD_NUMBER

IMAGETAG="gcr.io/$PROJECT/$APPNAME"

echo $IMAGETAG

docker build -t "$IMAGETAG:$BRANCH.$NCI_BUILD_NUMBER" -t "$IMAGETAG:$BRANCH.latest" .
