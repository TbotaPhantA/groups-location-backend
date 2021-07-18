import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { NativeAuthController } from './native-auth.controller';
import { NativeAuthService } from './native-auth.service';

@Module({
  controllers: [NativeAuthController],
  providers: [NativeAuthService],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'zabor', 
      signOptions: {
        expiresIn: '5m'
      }
    }),
  ]
})
export class NativeAuthModule {}
