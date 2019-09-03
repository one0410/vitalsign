declare var require: any;
import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
// import ip from 'ip';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less']
})
export class AboutComponent implements OnInit {

  version: string;
  ip: string[];
  mac: string;
  server: string;

  constructor(private storage: StorageMap) {
  }

  async ngOnInit() {
    // console.log('ngOnInit', this.findIP());
    // this.ip = this.findIP();
    this.ip = await this.findLocalIp();
    this.version = 'VERSION';
    this.storage.get('server').subscribe((server: string) => {
      this.server = server;
    });
  }

  /* ES6 */
  findLocalIp(logInfo = true): Promise<string[]> {
    return new Promise((resolve, reject) => {
      (window as any).RTCPeerConnection = (window as any).RTCPeerConnection
        || (window as any).mozRTCPeerConnection
        || (window as any).webkitRTCPeerConnection;

      if (typeof (window as any).RTCPeerConnection === 'undefined') {
        return reject('WebRTC not supported by browser');
      }

      let pc = new RTCPeerConnection();
      let ips = [];

      pc.createDataChannel('');
      pc.createOffer()
        .then(offer => pc.setLocalDescription(offer))
        .catch(err => reject(err));
      pc.onicecandidate = event => {
        if (!event || !event.candidate) {
          // All ICE candidates have been sent.
          if (ips.length === 0) {
            return reject('WebRTC disabled or restricted by browser');
          }

          return resolve(ips);
        }

        const parts = event.candidate.candidate.split(' ');
        const [base, componentId, protocol, priority, ip, port, , type, ...attr] = parts;
        const component = ['rtp', 'rtpc'];

        if (!ips.some(e => e === ip)) {
          ips.push(ip);
        }

        if (!logInfo) {
          return;
        }

        console.log(' candidate: ' + base.split(':')[1]);
        console.log(' component: ' + component[+componentId - 1]);
        console.log('  protocol: ' + protocol);
        console.log('  priority: ' + priority);
        console.log('        ip: ' + ip);
        console.log('      port: ' + port);
        console.log('      type: ' + type);

        if (attr.length) {
          console.log('attributes: ');
          for (let i = 0; i < attr.length; i += 2) {
            console.log('> ' + attr[i] + ': ' + attr[i + 1]);
          }
        }

        console.log();
      };
    });
  }
}
