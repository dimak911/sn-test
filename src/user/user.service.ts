import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '@src/user/entities/user.entity';
import { ProfileService } from '@src/profile/profile.service';
import { MailService } from '@src/mail/mail.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({
      email: createUserDto.email,
      password: createUserDto.password,
      profile: await this.profileService.create({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
      }),
    });

    const retUser = await this.usersRepository.save(user);

    await this.sendMail(user);

    return retUser;
  }

  public async registerUser(
    user: CreateUserDto
  ): Promise<{ message: string }> {
    const existingUser = await this.findByEmail(user.email);

    if (existingUser) {
      throw new BadRequestException(
        `User with email ${user.email} already exists`
      );
    }

    const hashPassword = await this.hashUserPassword(user.password);

    const newUser: User = await this.create({
      ...user,
      password: hashPassword,
    });

    return {
      message:
        'We send you a verification email. Please confirm it first.',
    };
  }

  private async hashUserPassword(password): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public async findAll(): Promise<string> {
    return `This action returns all user`;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });

    return user;
  }

  public async findById(id: number): Promise<Omit<User, 'password'>> {
    const user: User = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException(`No user found with id ${id}`);
    }

    const { password: _, ...retUser } = user;

    return retUser;
  }

  private async generateToken(user: User): Promise<string> {
    const payload = { email: user.email, id: user.id };

    return this.jwtService.sign(payload);
  }

  public async verifyEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token);

      const user = await this.findByEmail(payload.email);

      await this.usersRepository.save({ ...user, isActive: true });

      return { message: 'User is activated' };
    } catch (e) {
      throw new BadRequestException('Invalid token');
    }
  }

  public async sendMail(user: User): Promise<void> {
    const token = await this.generateToken(user);

    this.mailService.sendVerificationEmail(user.email, token);
  }
}
