#!/usr/bin/env bash

NODE_ENV=production bundle exec compass compile
rhc scp chathappy upload public/css/styles.css app-root/data
git push openshift master
