import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable()
export class StorageService implements OnDestroy {
  private storage = JSON.parse(localStorage.getItem('currentUser'));
  private onSubject = new BehaviorSubject<{ key: string, value: any }>({key: 'currentUser', value: this.storage});
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
    console.log('store data', data);
    // the local application doesn't seem to catch changes to localStorage...
    this.onSubject.next({ key, value: data});
  }

  public reload(key: string, data: any): void {
    console.log('reload',data);
    this.onSubject.next({ key, value: data });
  }

  public clear(key) {
    localStorage.removeItem(key);
    // the local application doesn't seem to catch changes to localStorage...
    this.onSubject.next({ key, value: {} });
  }


  private start(): void {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea == localStorage && event.key === 'currentUser') {
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
