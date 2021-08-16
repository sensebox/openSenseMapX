import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'osem-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent {

  downloadDetails = {
    window: 'raw',
    operation: 'arithmeticMean',
    boxId: true,
    lat: true,
    lng: true,
    height: false,
    boxName: true,
    exposure: false,
    unit: true,
    value: true,
    createdAt: true,
    phenomenon: false,
    sensorId: false,
    sensorType: false,
    format: 'csv'
  };

  windows = ['raw', '10m', '1h', '1d'];
  operations = ['arithmeticMean', 'harmonicMean', 'geometricMean', 'min', 'max', 'mode', 'median', 'variance', 'rootMeanSquare', 'standardDeviation', 'sum'];

  download() {
    window.alert("ALERT");
  }

}
