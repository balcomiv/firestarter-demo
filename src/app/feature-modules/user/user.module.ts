import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './components/login/login.component';
import { GoogleSigninDirective } from './directives/google-signin.directive';

@NgModule({
  declarations: [LoginComponent, GoogleSigninDirective],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
