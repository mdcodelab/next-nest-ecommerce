import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  // Simple stub for registration. Replace with real user creation logic
  // (e.g., using Prisma) when ready.
  register(dto: RegisterDto) {
    // Build a safe user object to return (don't include password)
    const user = { email: dto.email, name: dto.name };
    return Promise.resolve({
      ok: true,
      message: 'User registered (stub)',
      user,
    });
  }
}
