import { Injectable } from '@nestjs/common';
import { CouchbaseService } from '../couchbase/couchbase.service';
import { Configuration } from './configuration.interface';
import { ViewQuery } from 'couchbase';
import { PlatformTypes } from '../enums';

@Injectable()
export class ConfigurationService {
  constructor(private readonly couchbaseService: CouchbaseService) { }

  add(type: PlatformTypes, name: string, configuration: Configuration[]) {
    return new Promise((resolve, reject) => {
      this.couchbaseService.getBucket().insert(`configuration_${type}_${name}`, {configuration, type: `configuration_${type}`}, (err, data) => {
        if (err) return reject(null);
        resolve(data);
      });
    });
  }

  delete(type: PlatformTypes, name: string) {
    return new Promise((resolve, reject) => {
      this.couchbaseService.getBucket().remove(`configuration_${type}_${name}`, (err, data) => {
        if (err) return reject(null);
        resolve(data);
      });
    });
  }

  update(type: PlatformTypes, name: string, configuration: Configuration) {
    return new Promise((resolve, reject) => {
      this.couchbaseService.getBucket().upsert(`configuration_${type}_${name}`, {configuration, type: `configuration_${type}`}, (err, data) => {
        if (err) return reject(null);
        resolve(data);
      });
    });
  }

  get(type: PlatformTypes, name: string) {
    return new Promise((resolve, reject) => {
      this.couchbaseService.getBucket().get(`configuration_${type}_${name}`, (err, data) => {
        if (err) return reject(null);
        console.log("get data: ", data);
        resolve(data.map((g) => g.value));
      });
    });
  }

  getAll(type: PlatformTypes) {
    return new Promise((resolve, reject) => {
      const query = ViewQuery
        .from(`configuration_${type}`, 'getAll')
        .stale(ViewQuery.Update.BEFORE);
      this.couchbaseService.getBucket().query(query, (err, data) => {
        if (err) return reject(null);
        resolve(data.map((g) => g.value));
      });
    });
  }
}
