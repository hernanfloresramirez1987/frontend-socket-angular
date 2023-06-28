import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private authServ: AuthService,
    private router: Router) {}
  logout() {
    if (this.authServ.logout()) {
      this.router.navigate(["login"])
    }
  }
}
