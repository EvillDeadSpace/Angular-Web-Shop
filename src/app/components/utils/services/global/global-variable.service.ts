// filepath: /src/app/global.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public apiUrl: string = 'kurcina';
  public anotherGlobalVar: string = 'someValue';
  public username: string | null = null;
  constructor() {}
}
