
# [Lian Lian Kan](https://lianliankan.netlify.app)
## Overview
A Chinese tile matching game. Click tiles that have the same icon and an unobstructed path between them that makes no more than 2 turns.

## Technical Details
Pathfinding algorithm uses DFS. A Star and Djikstra were both tested, but aren't more efficient because the tile-connecting path has no length requirement. The solution often has long reroutes.

## To Do
- Write the pathfinding algorithm in C++ and use Web Assembly for quicker computation
- Highlight the path between two tiles that are successfully connected
- Time each game and add a leaderboard
- Optimize performance
- "Battle Mode" - redis cache

