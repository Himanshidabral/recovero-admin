import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public headerData = new BehaviorSubject<{ isHandset: boolean, headerText: string }>({ isHandset: false, headerText: '' });

  constructor() { }
}
