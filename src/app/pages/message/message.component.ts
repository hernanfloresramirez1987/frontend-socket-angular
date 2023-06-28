import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';


interface Messajes{
  username: string
  message: number
  dates: string
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
    fgr: FormGroup
    usersConnecteds = 0
    mensajes: Messajes[] = []
    userCurrent=""
    typingCurrent=""
    constructor(
      private chat: SocketService,
      private fb: FormBuilder,
      private auth: AuthService
    ) {
      this.fgr = this.build();
    }
    ngOnInit(): void {
      this.onConnecteds()
      this.socketOn('chat:message')
      this.userCurrent = this.auth.getUser()+""
      this.onTypings()
      this.onChangForm()
    }
    build(): FormGroup {
      return this.fb.group({
        message: ['', Validators.required]
      })
    }
    onChangForm() {
      this.fgr.valueChanges
        .subscribe(res => {
          this.chat.emit("chat:typing", {
            'username': this.userCurrent,
            'message': this.fgr.value.message.length
          })
        })
    }
    async onTypings() {
      return await this.chat.listen("chat:typing")
        .subscribe((res: any) => {
            if(res.message>0) {
              this.typingCurrent = res.username;
            } else {
              this.typingCurrent = ""
            }
          },
          (err) => { console.log("errrrrrrrr : ", err); })
    }
    async onConnecteds() {
      return await this.chat.listen("connecteds")
        .subscribe((res: any) => {
            this.usersConnecteds = res.userconecteds;
          },
          (err) => { console.log("errrrrrrrr : ", err); })
    }
    async socketOn(nameSocket: string) {
      return await this.chat.listen(nameSocket)
        .subscribe((res: any) => {
            this.mensajes.push(res)
          },
          (err) => { console.log("errrrrrrrr : ", err); })
    }
    async sendMessage() {
      let msg = {
        "username": this.userCurrent,
        "message": this.fgr.value.message,
        "dates": new Date()
      }
      this.limpiar();
      return await this.chat.emit("chat:message", msg);
    }
    limpiar() {
      this.fgr.patchValue({
        username: '',
        message: ''
      })
    }
  }
  