import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoMaterialModule } from './material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StorageModule } from '@ngx-pwa/local-storage';
import { LocalRecordListComponent } from './local-record-list/local-record-list.component';
import { RemoteRecordListComponent } from './remote-record-list/remote-record-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    LocalRecordListComponent,
    RemoteRecordListComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FlexLayoutModule,
    StorageModule.forRoot({ IDBNoWrap: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
