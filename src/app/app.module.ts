import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Módulos
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';

//Componentes
import { AppComponent } from './app.component';
import { ListFramesComponent } from './components/list-frames/list-frames.component';
import { CreateFrameComponent } from './components/create-frame/create-frame.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    ListFramesComponent,
    CreateFrameComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
