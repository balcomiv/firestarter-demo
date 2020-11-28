import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

type LoginType = 'login' | 'signup' | 'reset';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss'],
})
export class EmailLoginComponent implements OnInit {
  form!: FormGroup;
  loginType: LoginType = 'login';
  loading = false;
  serverMessage = '';

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: [''],
    });
  }

  changeType(loginType: LoginType): void {
    this.loginType = loginType;
  }

  get isLogin(): boolean {
    return this.loginType === 'login';
  }

  get isSignup(): boolean {
    return this.loginType === 'signup';
  }

  get isPasswordReset(): boolean {
    return this.loginType === 'reset';
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  get passwordConfirm(): AbstractControl | null {
    return this.form.get('passwordConfirm');
  }

  get signup(): AbstractControl | null {
    return this.form.get('signup');
  }

  get passwordDoesMatch(): boolean {
    if (this.loginType !== 'signup') {
      return true;
    }
    return this.password?.value === this.passwordConfirm?.value;
  }

  async onSubmit(): Promise<void> {
    this.loading = true;

    const email = this.email?.value;
    const password = this.password?.value;

    try {
      if (this.isLogin) {
        await this.afAuth.signInWithEmailAndPassword(email, password);
      }
      if (this.isSignup) {
        await this.afAuth.createUserWithEmailAndPassword(email, password);
      }
      if (this.isPasswordReset) {
        await this.afAuth.sendPasswordResetEmail(email);
      }
    } catch (error) {
      this.serverMessage = error;
    }

    this.loading = false;
  }
}
