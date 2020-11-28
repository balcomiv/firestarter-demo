import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { GoogleSigninDirective } from './directives/google-signin.directive';
import { UserRoutingModule } from './user-routing.module';
import { EmailLoginComponent } from './components/email-login/email-login.component';

@NgModule({
  declarations: [LoginComponent, GoogleSigninDirective, EmailLoginComponent],
  imports: [CommonModule, ReactiveFormsModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
