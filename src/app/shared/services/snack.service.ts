import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  authError(): void {
    this.snackBar.open('You must be logged in!', 'OK', { duration: 5000 });

    this.snackBar._openedSnackBarRef
      ?.onAction()
      .pipe(
        finalize(() => {
          console.log('Finalize');
          this.router.navigate(['/login']);
        })
      )
      .subscribe(
        () => {
          console.log('Subscribed');
        },
        (error) => console.log,
        () => {
          console.log('Completed');
        }
      );
  }
}
