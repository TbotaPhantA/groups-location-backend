import { Test, TestingModule } from '@nestjs/testing';
import { NativeAuthService } from './native-auth.service';

describe('NativeAuthService', () => {
  let service: NativeAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NativeAuthService],
    }).compile();

    service = module.get<NativeAuthService>(NativeAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
