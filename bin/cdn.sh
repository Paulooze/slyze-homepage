#!/bin/bash

gsutil rm gs://slyze/**
gsutil cp -Z -r static/** gs://slyze
