import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartyModule } from './parties/parties.module';
import { Random } from './utilities/random';
import { Words } from './utilities/words';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'you_party_user',
      password: 'dummy',
      database: 'you_party',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
    }),
    PartyModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Random,
    Words,
  ],
})
export class AppModule {}
