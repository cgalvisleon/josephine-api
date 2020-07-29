#!/bin/sh

sudo git pull origin master
sudo systemctl reload nginx
sudo nginx -t
pm2 reload app
pm2 list
echo ""
echo "Process Finished"
echo ""
