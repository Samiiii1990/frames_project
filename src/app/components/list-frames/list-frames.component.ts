import { Component, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-frames',
  templateUrl: './list-frames.component.html',
  styleUrls: ['./list-frames.component.css']
})
export class ListFramesComponent {
  firestore: Firestore = inject(Firestore)
  items$: Observable<any[]>;

  constructor() {
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
  }
}
