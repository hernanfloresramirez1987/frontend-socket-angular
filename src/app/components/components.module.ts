import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ControlbarComponent } from './controlbar/controlbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ContentHeaderComponent } from './content-header/content-header.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ControlbarComponent,
    FooterComponent,
    ContentHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    ControlbarComponent,
    FooterComponent,
    ContentHeaderComponent
  ]
})
export class ComponentsModule { }
