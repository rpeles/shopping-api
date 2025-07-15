import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let mockUser;

  const userServiceMock = {
    findByUsername: jest.fn(),
  };

  const jwtServiceMock = {
    sign: jest.fn().mockReturnValue('fake-token'),
  };

  beforeAll(async () => {
    const hashed = await bcrypt.hash('1234', 10);
    mockUser = {
      id: 1,
      username: 'rachel',
      password: hashed,
    };
  });

  beforeEach(async () => {
    userServiceMock.findByUsername.mockResolvedValue(mockUser);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should return a token if login is successful', async () => {
    const result = await authService.login('rachel', '1234');
    expect(result).toEqual({ access_token: 'fake-token' });
  });

  it('should throw if password is wrong', async () => {
    const wrongPassword = 'wrongpass';
    const result = authService.login('rachel', wrongPassword);
    await expect(result).rejects.toThrow(UnauthorizedException);
  });

  it('should throw if user not found', async () => {
    userServiceMock.findByUsername.mockResolvedValueOnce(null);

    const result = authService.login('no-user', '1234');
    await expect(result).rejects.toThrow(UnauthorizedException);
  });
});
