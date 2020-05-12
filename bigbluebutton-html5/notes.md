docker build --tag mevee:1.0 .
docker run --publish 8000:8080 --detach --name bb mevee:1.0



meteor --allow-superuser

npm rebuild node-sass

meteor --allow-superuser --port 3001



meteor reset && ROOT_URL=http://127.0.0.1/html5client NODE_ENV=production meteor --allow-superuser --port 3001 --production



export ENV_METEOR_ALLOW_SUPERUSER=true


bbb-conf --stop