#!/bin/bash

gsutil rm gs://slyze/**
gsutil cp -Z -r static/** gs://slyze
gsutil mv -p gs://slyze/zlava-na-nakup.html gs://slyze/zlava-na-nakup
gsutil mv -p gs://slyze/zlava-na-pozicanie.html gs://slyze/zlava-na-pozicanie
gsutil mv -p gs://slyze/zlava-na-servis.html gs://slyze/zlava-na-servis