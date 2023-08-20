import { Component, OnInit, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { collectionData } from '@angular/fire/firestore';
// import { Firestore, collection } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-arch';

  // item$: Observable<any[]>;
  // firestore: Firestore = inject(Firestore);

  constructor(
    private afs: AngularFirestore
    ) {
    // const itemCollection = collection(this.firestore, 'test');
    // this.item$ = collectionData(itemCollection);
  }

  ngOnInit(): void {
    // this.item$.subscribe(data=>{
      // console.log(data);
    // })
    this.afs.collection('test').snapshotChanges().subscribe(data=>{
      console.log(data);
    });
  }
}
