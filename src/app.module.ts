import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
// import { BooksModule } from './modules/books/books.module';
import { PetsModule } from './modules/pets/pets.module';
import { Books } from './modules/books/entity/books.entity';
import { Pets } from './modules/pets/entity/pets.entity';
import { Topics } from './modules/topics/entity/topics.entity';
import { TopicsModule } from './modules/topics/topics.module';
import { Comments } from './modules/comments/entity/comments.entity';
import { CommentsModule } from './modules/comments/comments.module';
import { Likes } from './modules/likes/entity/likes.entity';
import { LikesModule } from './modules/likes/likes.module';
import { AuthService } from './modules/auth/auth.service';
import { AuthController } from './modules/auth/auth.controller';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { Users } from './modules/users/entity/users.entity';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: 'nestjs_books_api',
        entities: [Books, Pets, Topics, Comments, Likes, Users],
        synchronize: true,
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_TOKEN'), // 用于签名 JWT 的密钥
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRE') }, // JWT 的过期时间
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    HttpModule,
    // BooksModule,
    PetsModule,
    TopicsModule,
    CommentsModule,
    LikesModule,
    UsersModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, JwtStrategy],
})
export class AppModule {}
