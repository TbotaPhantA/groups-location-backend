import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { JwtGuard } from './jwt-auth.guard';
import { NativeAuthController } from './native-auth.controller';
import { NativeAuthService } from './native-auth.service';
import { RefreshToken } from './refresh_tokens.entity';

@Module({
  controllers: [NativeAuthController],
  providers: [NativeAuthService],
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    UsersModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'zabor', 
      signOptions: {
        expiresIn: '50m'
      }
    }),
  ],
  exports: [
    NativeAuthService,
    JwtModule
  ]
})
export class NativeAuthModule {}
