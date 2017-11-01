APPNAME="slyze-fe"
BRANCH=$(git name-rev --name-only HEAD)

gsutil rsync -d -r ./static gs://freshit-storage-public/$APPNAME-$BRANCH
