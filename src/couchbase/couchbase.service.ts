import { Injectable } from '@nestjs/common';
import { Cluster } from 'couchbase';

@Injectable()
export class CouchbaseService {
  cluster: any;
  bucket: any;
  constructor() {
    this.cluster = new Cluster(process.env.COUCHBASE_URL);
    this.cluster.authenticate(process.env.COUCHBASE_USERNAME, process.env.COUCHBASE_PASSWORD);
    this.bucket = this.cluster.openBucket(process.env.COUCHBASE_BUCKET);
  }

  getBucket() {
    return this.bucket;
  }
}
