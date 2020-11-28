import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmailLoginComponent } from './components/email-login/email-login.component';
import { GoogleSigninDirective } from './directives/google-signin.directive';
import { LoginPageComponent } from './pages/login/login-page.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    LoginPageComponent,
    GoogleSigninDirective,
    EmailLoginComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
