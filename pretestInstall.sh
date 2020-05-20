#!/bin/bash

function checkErr()
{
    if [ $? -eq 0 ]; then
        echo  $1  "pretestadmin succeed"
    else
        echo $1 "pretestadmin fail"
    fi
}
git checkout develop

git pull

docker stop pretestadmin

checkErr stop

docker rm pretestadmin

checkErr rm

docker rmi pretestadmin

checkErr rmi

  docker build -t pretestadmin . && docker run -dit -p 7002:7001 \
  --restart=unless-stopped \
  --name pretestadmin \
  --mount type=bind,source=/root/logs/pretestAdmin,target=/egg/egglogs \
  pretestadmin