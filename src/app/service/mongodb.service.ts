import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingService } from './setting.service';
import * as EJSON from 'ejson';

@Injectable({
  providedIn: 'root'
})
export class MongodbService {

  private serverUrl: string;

  constructor(
    private http: HttpClient,
    private settingService: SettingService
  ) {
    this.settingService.getServerUrl().subscribe(url => {
      this.serverUrl = url;
    });
  }

  get(collection: string, filter: any, projection: any, sort: any, page = 0) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.serverUrl}/api/mongodb/${collection}?filter=${filter}&projection=${projection}`).subscribe((res: any) => {
        if (res.data) {
          res.data = EJSON.parse(JSON.stringify(res.data));
        }
        resolve(res);
      }, err => {
        console.error('get error', err);
        reject(err);
      });
    });
  }

  getById(collection: string, id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.serverUrl}/api/mongodb/${collection}/${id}`).subscribe((res: any) => {
        if (res.data) {
          res.data = EJSON.parse(JSON.stringify(res.data));
        }
        resolve(res);
      }, err => {
        console.error('get error', err);
        reject(err);
      });
    });
  }

  del(collection: string, id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.serverUrl}/api/mongodb/${collection}/${id}`).subscribe((res: any) => {
        resolve(res);
      }, err => {
        console.error('del error', err);
        reject(err);
      });
    });
  }

  post(collection: string, model: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.serverUrl}/api/mongodb/${collection}`, model).subscribe((res: any) => {
        resolve(res);
      }, err => {
        console.error('post error', err);
        reject(err);
      });
    });
  }

  put(collection: string, model: any) {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.serverUrl}/api/mongodb/${collection}`, model).subscribe((res: any) => {
        resolve(res);
      }, err => {
        console.error('put error', err);
        reject(err);
      });
    });
  }

  aggregate(collection: string, group: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.serverUrl}/api/mongodb/aggregate/${collection}/${group}`).subscribe((res: any) => {
        resolve(res);
      }, err => {
        console.error('aggregate error', err);
        reject(err);
      });
    });
  }
}
