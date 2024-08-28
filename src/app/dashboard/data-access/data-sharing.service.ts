import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class DataSharingService {
  private data: { [key: string]: any } = {};

  setData(key: string, value: any) {
    this.data[key] = value;
  }

  getData(key: string): any {
    return this.data[key];
  }
}
