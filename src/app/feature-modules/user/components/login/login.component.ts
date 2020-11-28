import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user$ = this.afAuth.authState.pipe(
    shareReplay() //  To make sure multiple async pipes are listening to same observable
  );

  constructor(public afAuth: AngularFireAuth) {}

  ngOnInit(): void {}
}
