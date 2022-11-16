import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LodingService {
    private _loding = new BehaviorSubject<boolean>(false);
    public readonly loading$ = this._loding.asObservable();

    constructor() { }

    public show(): void {
        this._loding.next(true);
    }

    public hide(): void {
        this._loding.next(false);
    }
}
