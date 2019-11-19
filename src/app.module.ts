import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { PageModule } from './page/page.module';
import { FragmentModule } from './fragment/fragment.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { dirname } from 'path';
import { CouchbaseModule } from './couchbase/couchbase.module';

const sentryUi = dirname(require.resolve('@puzzle-js/sentry-ui'));

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: sentryUi,
    }),
    GatewayModule,
    PageModule,
    FragmentModule,
    CouchbaseModule,
  ],
})
export class AppModule { }
