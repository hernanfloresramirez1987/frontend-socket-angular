import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formularioGrupo: FormGroup
  constructor(
    private fb: FormBuilder,
    private loginService: AuthService,
    private route: Router,
    private chat: SocketService,
    private toast: ToastrService) {
    this.formularioGrupo = this.buildForm()
  }
  buildForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.
        required],

    })
  }
  login() {
    this.loginService.login(this.formularioGrupo.value.email, this.formularioGrupo.value.password)
      .subscribe((res: any)=> {
        console.log(res)
        if (res.state == 1) {
          this.loginService.setUser(res.data)
          this.loginService.setToken(res.data)
          this.toast.success("Acceso correcto", "Bienvenido!!!")
          this.socket('connected')
          this.route.navigate(['profile']);
        } else {
          console.log("err res: ", res)
          this.toast.warning(res.message, 'Credenciales incorrectas')
        }
      }, (err: any) => {
        console.log("err: ", err)
        console.log(err.message)
        this.toast.error("Credenciales incorrectas", "Error!!!")
      })
  }
  async socket(nameSocket: string) {
    return await this.chat.listen(nameSocket)
      .subscribe(
        (res: any) => { console.log("ressss : ", res); },
        (err) => { console.log("err : ", err); });
  }
}
