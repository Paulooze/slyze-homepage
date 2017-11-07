APPNAME="slyze-fe"
BRANCH=$(git name-rev --name-only HEAD)

gsutil rm gs://freshit-storage-public/$APPNAME-$BRANCH/**
gsutil -h "Cache-Control:private, max-age=0, no-transform" cp -r static/** gs://freshit-storage-public/$APPNAME-$BRANCH/
