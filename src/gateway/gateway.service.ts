import { Injectable } from '@nestjs/common';
import { Gateway } from './gateway.interface';
import { CouchbaseService } from '../couchbase/couchbase.service';
import { ViewQuery } from 'couchbase';

@Injectable()
export class GatewayService {
  constructor(private readonly couchbaseService: CouchbaseService) { }

  add(gateway: Gateway) {
    return new Promise((resolve, reject) => {
      this.couchbaseService.getBucket().insert(`gateway_${gateway.name}`, {...gateway, type: 'gateway'}, (err, data) => {
        if (err) return reject(null);
        resolve(data);
      });
    });
  }

  delete(name: string) {
    return new Promise((resolve, reject) => {
      this.couchbaseService.getBucket().remove(`gateway_${name}`, (err, data) => {
        if (err) return reject(null);
        resolve(data);
      });
    });
  }

  update(gateway: Gateway) {
    return new Promise((resolve, reject) => {
      this.couchbaseService.getBucket().upsert(`gateway_${gateway.name}`, {...gateway, type: 'gateway'}, (err, data) => {
        if (err) return reject(null);
        resolve(data);
      });
    });
  }

  get() {
    return new Promise((resolve, reject) => {
      const query = ViewQuery
        .from('gateway', 'getAll')
        .stale(ViewQuery.Update.BEFORE);
      this.couchbaseService.getBucket().query(query, (err, data) => {
        console.log("err", err);
        console.log("data", data)
        if (err) return reject(null);
        const gateways = data.map((g) => g.value);
        resolve(gateways);
      });
    });
  }
}
