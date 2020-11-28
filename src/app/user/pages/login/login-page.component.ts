import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  user$ = this.afAuth.authState.pipe(
    shareReplay() //  To make sure multiple async pipes are listening to same observable
  );

  constructor(public afAuth: AngularFireAuth) {}

  ngOnInit(): void {}
}
