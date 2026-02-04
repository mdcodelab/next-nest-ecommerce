import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';

/**
 * DTO pentru înregistrare utilizator.
 * Folosește `class-validator` pentru validări.
 */
export class RegisterDto {
  @IsEmail({}, {message: 'Please provide a valid email address.'})
  @IsNotEmpty({message: 'Email is required'})
  email!: string;

  @IsString()
  @IsNotEmpty({message: 'Password is required'})
  @MinLength(6, { message: 'Password must have at least 6 characters' })
  @MaxLength(128, { message: 'Password must have at most 128 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, { message: 
    'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character' })
  password!: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastNameName?: string;
}

