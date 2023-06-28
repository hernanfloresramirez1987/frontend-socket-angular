import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) {}
  
  listen(eventNAme: string) {
    return new Observable((suscriber) => {
      this.socket.on(eventNAme, (data: any) => {
        suscriber.next(data)
      })
    });
  }
  emit(eventName: string, data: any) {
    return this.socket.emit(eventName, data);
  }
}
