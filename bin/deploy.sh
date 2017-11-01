#!bin/bash

PROJECT="freshit-services"
APPNAME="slyze-fe"
BRANCH=$(git name-rev --name-only HEAD)
DEPLOYNAME=$APPNAME-$BRANCH

echo $NCI_PROJECT_NAME
echo $NCI_BUILD_NUMBER

IMAGETAG="gcr.io/$PROJECT/$APPNAME"

echo $IMAGETAG

gcloud docker -- push ${IMAGETAG}

docker rmi ${IMAGETAG}

kubectl set image deployment/$DEPLOYNAME $DEPLOYNAME="$IMAGETAG:$BRANCH.$NCI_BUILD_NUMBER" --namespace=services
