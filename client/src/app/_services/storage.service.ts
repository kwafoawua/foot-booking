import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable()
export class StorageService implements OnDestroy {

  private onSubject = new BehaviorSubject<{ key: string, value: any }>({key: '', value: {}});
  public changes = this.onSubject.asObservable().pipe(share());

  constructor() {
    this.start();
  }

  ngOnDestroy() {
    this.stop();
  }

  public getStorage(key: string): Observable<any> {
    return this.changes;
  }

  public store(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    // the local application doesn't seem to catch changes to localStorage...
    this.onSubject.next({ key, value: data});
  }
  public reload(key: string, data: any): void {
    console.log(data);
    this.onSubject.next({ key, value: data });
  }

  public clear(key) {
    localStorage.removeItem(key);
    // the local application doesn't seem to catch changes to localStorage...
    this.onSubject.next({ key, value: null });
  }


  private start(): void {
    window.addEventListener('storage', this.storageEventListener.bind(this));
    if (localStorage.getItem('currentUser')) {
      this.onSubject.next({ key: 'currentUser', value: JSON.parse(localStorage.getItem('currentUser')) });
    }
  }

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea == localStorage) {
      let v;
      try { v = JSON.parse(event.newValue); }
      catch (e) { v = event.newValue; }
      this.onSubject.next({ key: event.key, value: v });
    }
  }

  private stop(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
    this.onSubject.complete();
  }
}
