import { Test, TestingModule } from '@nestjs/testing';
import { NativeAuthController } from '../native-auth.controller';

describe('NativeAuthController', () => {
  let controller: NativeAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NativeAuthController],
    }).compile();

    controller = module.get<NativeAuthController>(NativeAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
