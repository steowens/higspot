#!/bin/bash

curl -v -d @badPlaylist.json -H "Content-Type: application/json" -X POST "http://localhost:8081/playlist"


