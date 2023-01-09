#!/bin/bash

echo "@ = $@"

set -m

if [ -z "$@" ];
then
	echo "Remove leftover socket file"
	rm /tmp/*.sock

	echo "Running mongo"
	mongod --bind_ip_all &

	sleep 5

	mongo admin --eval "db.getSiblingDB('small_climbing_gym').createUser({user: 'api_user1', pwd: 'api_pass1', roles: ['readWrite']})"
	mongo admin --eval "db.getSiblingDB('test').createUser({user: 'test', pwd: 'test', roles: ['readWrite']})"

	fg
else
	eval $@
fi