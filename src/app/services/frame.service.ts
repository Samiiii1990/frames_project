import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore/'; 
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrameService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  addFrame(frame: any, imageFile: File): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const filePath = `frames/${imageFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, imageFile);
  
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(
            (imageUrl: string) => {
              frame.imageUrl = imageUrl;
              this.firestore.collection('frames').add(frame)
                .then((docRef) => resolve(docRef))
                .catch((error) => reject(error));
            },
            (error) => reject(error)
          );
        })
      ).subscribe();
    });
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
