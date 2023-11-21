import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, from, map, of, switchMap, take, tap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './user.actions';
import { EmailPasswordCredentials, User } from './user.models';

import { NotificationService } from '@app/services';
import { environment } from '@env/environment';

type Action = fromActions.All;

@Injectable()
export class UserEffects {
    constructor(
        private actions: Actions,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private notifications: NotificationService
    ) {}

    init: Observable<Action> = createEffect(() => this.actions.pipe(
        ofType(fromActions.Types.INIT),
        switchMap(() => this.afAuth.authState.pipe(take(1))),
        switchMap(authState => {
            if(authState) {
                return this.afs.doc<User>(`users/${authState.uid}`).valueChanges().pipe(
                    take(1),
                    map(user => new fromActions.InitAuthorized(authState.uid, user || null)),
                    catchError(err => of(new fromActions.InitError(err)))
                )
            } else {
                return of(new fromActions.InitUnauthorized());
            }
        })
    ));

    signUpEmail: Observable<Action> = createEffect(() => this.actions.pipe(
        ofType(fromActions.Types.SIGN_UP_EMAIL),
        map((action: fromActions.SignUpEmail) => action.credentials),
        switchMap((credentials: EmailPasswordCredentials) => 
            from(this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)).pipe(
                tap(() => {
                    this.afAuth.currentUser
                        .then((user) => { 
                            user?.sendEmailVerification(environment.actionCodeSettings)
                            this.router.navigate(['/auth/email-confirm']);
                        })
                        .catch((error) => this.notifications.error(error.message));
                }),
                map((signUpState) => signUpState.user ? new fromActions.SignUpEmailSuccess(signUpState.user.uid) : new fromActions.SignUpEmailError('error')),
                catchError((error) => {
                    this.notifications.error(error.message);
                    return of(new fromActions.SignUpEmailError(error.message))
                })
            )
        )        
    ));


    signInEmail: Observable<Action> = createEffect(() => this.actions.pipe(
        ofType(fromActions.Types.SIGN_IN_EMAIL),
        map((action: fromActions.SignInEmail) => action.credentials),
        switchMap((credentials: EmailPasswordCredentials) => 
            from(this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password)).pipe(
                switchMap((signInState) => 
                    this.afs.doc<User>(`users/${signInState.user?.uid}`).valueChanges().pipe(
                        take(1),
                        tap(() => {
                            this.router.navigate(['/']);
                        }),
                        map((user) => new fromActions.SignInEmailSuccess(signInState.user? signInState.user.uid : '', user || null))
                    )
                ),
                catchError((error) => {
                    this.notifications.error(error.message);
                    return of(new fromActions.SignInEmailError(error.message))
                })
            )
        )
    ));

    signOut: Observable<Action> = createEffect(() => this.actions.pipe(
        ofType(fromActions.Types.SIGN_OUT),
        switchMap(() => 
            from(this.afAuth.signOut()).pipe(
                map(() => new fromActions.SignOutSuccess()),
                catchError((error) => of(new fromActions.SignOutError(error.message)))
            )
        )
    ));

}