import { Injectable } from '@angular/core';
import { Field, Type } from './field';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  readonly WIDTH: number = 10;
  readonly HEIGHT: number = 10;
  fields: Field[] = [];

}
