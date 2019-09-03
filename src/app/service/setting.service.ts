import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private storage: StorageMap) { }

  getServerUrl(): Observable<string> {
    return this.storage.get('serverUrl', { type: 'string' });
  }
}
