import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore/'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrameService {

  constructor(private firestore: AngularFirestore) { }

  addFrame(frame: any | null): Promise<any>{
    return this.firestore.collection('frames').add(frame)
  }

  getFrames(): Observable<any>{
    return this.firestore.collection('frames').snapshotChanges();
  }

  deleteFrame(id: string): Promise<any>{
    return this.firestore.collection('frames').doc(id).delete();
  }

  getFrameById(id: string): Observable<any>{
    return this.firestore.collection('frames').doc(id).snapshotChanges();
  }

  updateFrame(id: string, data: any){
    return this.firestore.collection('frames').doc(id).update(data);
  }
}
