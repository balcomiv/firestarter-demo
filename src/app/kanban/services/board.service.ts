import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Board, Task } from '../board.interface';
import { Collections } from '../enums/collections.enum';

//  https://github.com/angular/angularfire/issues/2008
//  https://dev.to/vborodulin/ts-how-to-override-properties-with-type-intersection-554l
type Override<T1, T2> = Omit<T1, keyof T2> & T2;
type BoardUpdate = Override<Board, { tasks: firebase.firestore.FieldValue }>;

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  /**
   * Creates a new board the the current user
   */
  async createBoard(data: Board): Promise<DocumentReference<Board>> {
    const user = await this.afAuth.currentUser;
    return this.db.collection<Board>(Collections.Boards).add({
      ...data,
      uid: user?.uid,
      tasks: [{ description: 'Hello', label: 'yellow' }],
    });
  }

  /**
   * Delete board
   */
  deleteBoard(boardId: string): Promise<void> {
    return this.db.collection<Board>(Collections.Boards).doc(boardId).delete();
  }

  /**
   * Update the tasks on board
   */
  updateTasks(boardId: string, tasks: Task[]): Promise<void> {
    return this.db
      .collection<Board>(Collections.Boards)
      .doc(boardId)
      .update({ tasks });
  }

  /**
   * Remove a specific task from the board
   */
  removeTask(boardId: string, task: Task): Promise<void> {
    return this.db
      .collection<BoardUpdate>(Collections.Boards)
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task),
      });
  }

  /**
   * Get all boards owned by current user
   */
  //  Fix Me -- Type this properly
  // tslint:disable-next-line: no-any
  getUserBoards(): Observable<any> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Board>(Collections.Boards, (ref) =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' });
        } else {
          //  Note: The tutorial just returned [], not of([])
          return of([]);
        }
      })
    );
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   */
  sortBoards(boards: Board[]): void {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map((b) => db.collection(Collections.Boards).doc(b.id));

    refs.forEach((ref, i) => batch.update(ref, { priority: i }));
    batch.commit();
  }
}
