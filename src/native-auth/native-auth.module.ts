import { Module } from '@nestjs/common';
import { NativeAuthController } from './native-auth.controller';
import { NativeAuthService } from './native-auth.service';

@Module({
  controllers: [NativeAuthController],
  providers: [NativeAuthService]
})
export class NativeAuthModule {}
