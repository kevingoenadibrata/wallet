#!/bin/bash
while getopts ":c" opt; do
  case $opt in
    c)
      echo "cleaning..." >&2
      docker-compose down -v
      exit 0 
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      ;;
  esac
done

echo "Setting up npm"
npm i

echo "Setting up docker"
docker-compose up -d
echo "To run server: npm start"
