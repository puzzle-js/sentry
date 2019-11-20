import { Injectable } from '@nestjs/common';
import { CouchbaseService } from '../couchbase/couchbase.service';
import { Page } from './page.interface';
import {ViewQuery} from 'couchbase';
@Injectable()
export class PageService {
  constructor(private readonly couchbaseService: CouchbaseService) { }

  add(page: Page) {
    return new Promise((resolve, reject) => {
      this.couchbaseService.getBucket().insert(`page_${page.name}`, {...page, type: 'page'}, (err, data) => {
        if (err) return reject(null);
        resolve(data);
      });
    });
  }

  delete(name: string) {
    return new Promise((resolve, reject) => {
      this.couchbaseService.getBucket().remove(`page_${name}`, (err, data) => {
        if (err) return reject(null);
        resolve(data);
      });
    });
  }

  update(page: Page) {
    return new Promise((resolve, reject) => {
      this.couchbaseService.getBucket().upsert(`page_${page.name}`, { ...page, type: 'page' }, (err, data) => {
        if (err) return reject(null);
        resolve(data);
      });
    });
  }

  get() {
    return new Promise((resolve, reject) => {
      const query = ViewQuery
        .from('page', 'getAll')
        .stale(ViewQuery.Update.BEFORE);
      this.couchbaseService.getBucket().query(query, (err, data) => {
        if (err) return reject(null);
        const pages = data.map((d) => d.value);
        pages.sort((a, b) => Number(a.index) > Number(b.index));
        resolve(pages);
      });
    });
  }
}
