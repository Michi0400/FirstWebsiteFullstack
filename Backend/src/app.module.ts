import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AngabeModule } from './angabe/angabe.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RezeptModule } from './question/rezept.module';
import { ShoppinglistModule } from './shoppinglist/shoppinglist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'postgres',
      synchronize: true,
      logging: true,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      migrations: ['./migrations/*.{ts,js}'],
      cli: {
        migrationsDir: 'migrations',
      },
    }),
    RezeptModule,
    ShoppinglistModule,
    AngabeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
