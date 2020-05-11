# Docker Swarm

## Initialize a Docker Swarm

```bash
for i in 1 2 3; do
    docker-machine create -d virtualbox node-$i
done

eval $(docker-machine env node-1)

docker swarm init --advertise-addr $(docker-machine ip node-1)

TOKEN=$(docker swarm join-token -q worker)

for i in 2 3; do
    eval $(docker-machine env node-$i)

    docker swarm join --token $TOKEN --advertise-addr $(docker-machine ip node-$i) $(docker-machine ip node-1):2377
done

eval $(docker-machine env node-1)

docker node ls
```

## Scaling Service

```bash
# Run docker commands in the manager node
eval $(docker-machine env node-1)

docker service scale <serviceName>=5
```

## Creating Proxy

```bash
docker service create --name proxy -p 80:80 -p 443:443 -p 8080:8080 --network proxy -e MODE=swarm vfarcic/docker-flow-proxy
```
