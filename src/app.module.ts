import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// Environment
import { ENV as env } from './env/env';
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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.database.host,
      port: env.database.port,
      username: env.database.username,
      password: env.database.password,
      database: 'nestjs_books_api',
      entities: [Books, Pets, Topics, Comments, Likes],
      synchronize: true,
    }),
    JwtModule.register({
      secret: env.auth.jwt.secret, // 用于签名 JWT 的密钥
      signOptions: { expiresIn: '60s' }, // JWT 的过期时间
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // BooksModule,
    PetsModule,
    TopicsModule,
    CommentsModule,
    LikesModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, JwtStrategy],
})
export class AppModule {}
