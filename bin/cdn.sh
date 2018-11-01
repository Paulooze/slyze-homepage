#!/bin/bash

gsutil rm gs://slyze/**
gsutil -h "Cache-Control:private, max-age=0, no-transform" cp -Z -r static/** gs://slyze
