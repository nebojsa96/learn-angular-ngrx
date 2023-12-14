import { Injectable } from '@angular/core';
import { Resolve  } from '@angular/router';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { Store, select } from '@ngrx/store';
import { Observable, filter, take } from 'rxjs';


@Injectable()
export class UserResolver implements Resolve<fromUser.User | null> {
    constructor(private store: Store<fromRoot.State>) {

    }

    resolve(): Observable<fromUser.User | null> {
        return this.store.pipe(select(fromUser.getUser), filter(user => !!user),take(1))
    }
}