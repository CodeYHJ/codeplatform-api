
#!/bin/bash

function checkErr()
{
    if [ $? -eq 0 ]; then
        echo  $1  "admin succeed"
    else
        echo $1 "admin fail"
    fi
}
git checkout master

git pull

docker stop admin

checkErr stop

docker rm admin

checkErr rm

docker rmi admin

checkErr rmi

docker build -t admin . && docker run -dit -p 7001:7001 \
  --restart=unless-stopped \
  --name admin \
  --mount type=bind,source=/root/logs/admin,target=/egg/egglogs \
  admin