import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MicrofrontendCommunicationService<T> {
  private eventSubject = new Subject<T>();

  constructor() { }

  sendData(data: T, type: EventType) {
    const event = new CustomEvent(type, { detail: data });
    window.dispatchEvent(event);
  }

  listenForData(): Observable<T> {
    return this.eventSubject.asObservable();
  }

  initializeListener(type: EventType) {
    window.addEventListener(type, (event) => {
      const data = (event as CustomEvent).detail as T;
      this.eventSubject.next(data);
    });
  }
}

export enum EventType {
  MfeToShell = "microfrontendEventMfeToShell",
  ShellToMfe = "microfrontendEventShellToMfe"
}
