import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalRecordListComponent } from './local-record-list/local-record-list.component';
import { RemoteRecordListComponent } from './remote-record-list/remote-record-list.component';


const routes: Routes = [{
  path: 'local', component: LocalRecordListComponent
},
{
  path: 'remote', component: RemoteRecordListComponent
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        enableTracing: true
      }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
