import { Component, OnInit } from '@angular/core';
import { VitalSign } from '../VitalSign';
import { StorageMap } from '@ngx-pwa/local-storage';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  localRecords: VitalSign[];
  elementId: string;
  vitalSign: VitalSign;
  constructor(private storage: StorageMap) {
    this.vitalSign = new VitalSign();
  }

  ngOnInit() {
    this.storage.get('vitalSign').subscribe((v: VitalSign[]) => {
      this.localRecords = v;
      if (!this.localRecords) {
        this.localRecords = [];
      }
    });
  }

  setTemperature(value: number) {
    this.vitalSign.temperature = Math.floor(this.vitalSign.temperature) + value;
  }

  addText(text: string) {
    const input = document.getElementById(this.elementId);
    if (!input) {
      return;
    }

    input.innerText += text;
    input.focus();
    (input as HTMLInputElement).selectionStart = input.innerText.length;
  }

  removeText() {
    const text = document.getElementById(this.elementId).innerText;
    document.getElementById(this.elementId).innerText = text.substring(0, text.length - 1);
  }

  save() {
    this.vitalSign.timestamp = moment().toDate();
    this.localRecords.push(this.vitalSign);
    this.storage.set('vitalSign', this.localRecords).subscribe({
      next: () => {},
      error: (error) => {
        console.error('vitalSign error', error);
      },
    });
    this.vitalSign = new VitalSign();
    document.getElementById('localRecordsLength').innerText = this.localRecords.length.toString();

  }
}
