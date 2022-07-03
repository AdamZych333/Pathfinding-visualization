import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { Algorithm } from './utils/algorithms';
import { astar } from './utils/algorithms/A-star';
import { bfs } from './utils/algorithms/bfs';
import { dfs } from './utils/algorithms/dfs';
import { dijkstra } from './utils/algorithms/dijkstra';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmsService {
  constructor() {}

  startAlgorithm(name: string){
    switch(name){
      case Algorithm.ASTAR:
        astar();
        break;
      case Algorithm.BFS:
        bfs();
        break;
      case Algorithm.DFS:
        dfs();
        break;
      case Algorithm.DIJKSTRA:
        dijkstra();
        break;
    }
  }
}
