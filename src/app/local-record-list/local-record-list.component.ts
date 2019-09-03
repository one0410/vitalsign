import { Component, OnInit } from '@angular/core';
import { VitalSign } from '../VitalSign';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MongodbService } from '../service/mongodb.service';

@Component({
  selector: 'app-local-record-list',
  templateUrl: './local-record-list.component.html',
  styleUrls: ['./local-record-list.component.less']
})
export class LocalRecordListComponent implements OnInit {

  localRecords: VitalSign[];
  constructor(
    private storage: StorageMap,
    private mongodbService: MongodbService
  ) {
  }

  ngOnInit() {
    // angular storage 用法
    // https://github.com/cyrilletuzi/angular-async-local-storage
    // 怕會有垃圾資料, 一開始先空白的去掉
    this.storage.get('vitalSign').subscribe((records: VitalSign[]) => {
      if (records) {
        this.localRecords = records.filter((item) => item);
        document.getElementById('localRecordsLength').innerText = this.localRecords.length.toString();
      }
    });
  }

  delete() {
    if (confirm('確定要刪除嗎?')) {
      this.localRecords = this.localRecords.filter((item) => {
        return !item.isChecked;
      });

      this.storage.set('vitalSign', this.localRecords);
      document.getElementById('localRecordsLength').innerText = this.localRecords.length.toString();
    }
  }

  upload() {
    this.localRecords = this.localRecords.map((item) => {
      delete item.isChecked;
      return item;
    });

    this.localRecords.forEach(element => {
      this.mongodbService.post('vitalsign', element);
    });

    this.localRecords = [];
  }

  selectAll() {
    this.localRecords.map((item) => {
      item.isChecked = true;
    });
  }
}
