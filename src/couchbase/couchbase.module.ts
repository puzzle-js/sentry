import { Module, Global } from '@nestjs/common';
import { CouchbaseService } from './couchbase.service';

@Global()
@Module({
  providers: [CouchbaseService],
  exports: [CouchbaseService],
})
export class CouchbaseModule {}
