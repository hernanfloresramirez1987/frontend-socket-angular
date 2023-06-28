import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formularioGrupo: FormGroup
  constructor(
    private fb: FormBuilder,
    private registService: AuthService,
    private socketIo: SocketService,
    private route: Router) {
    this.formularioGrupo = this.buildForm()
  }
  buildForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      roles: ['', Validators.required],
    })
  }
  registrarse() {
    this.registService.register(
      this.formularioGrupo.value.username,
      this.formularioGrupo.value.email,
      this.formularioGrupo.value.password,
      this.formularioGrupo.value.roles
    ).subscribe((res: any) => {
      if(res.state == 1) {
        console.log(res)
        this.registService.setUser(this.formularioGrupo.value.username)
        this.registService.setToken(res.data)
        this.socket("connected")
      }
    }, (err: string) => {
      console.log(err)
    })
  }

  async socket(nameSocket: string) {
    return await this.socketIo.listen(nameSocket).subscribe(
        (res: any) => { console.log("ressss : ", res); }, 
        (err) => { console.log("err : ", err); } ); 
  }
}
