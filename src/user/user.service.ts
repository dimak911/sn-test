import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
// import { UpdateUserDto } from '@src/user/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '@src/user/entities/user.entity';
import { ProfileService } from '@src/profile/profile.service';
import { IUser } from '@src/user/models/user.interface';
import { MailService } from '@src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create({
      email: createUserDto.email,
      password: createUserDto.password,
      profile: await this.profileService.create({
        firstName: createUserDto.firstName,
      }),
    });

    const retUser = await this.usersRepository.save(user);

    await this.sendMail(user);

    return retUser;
  }

  public async findAll() {
    return `This action returns all user`;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });

    // if (!user) {
    //   throw new BadRequestException(`No user found with email ${email}`);
    // }

    return user;
  }

  public async findById(id: number) {
    const user: IUser = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException(`No user found with id ${id}`);
    }

    const { password: _, ...retUser } = user;

    return retUser;
  }

  // public async update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  //
  // public async remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  public async checkActivation(email: string) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new BadRequestException(`No user found with email ${email}`);
    }

    return user.isActive;
  }

  private async generateToken(user: IUser) {
    const payload = { email: user.email, id: user.id };
    const token = this.jwtService.sign(payload);

    return token;
  }

  public async verify(token: string) {
    try {
      const payload = this.jwtService.verify(token);

      const user = await this.findByEmail(payload.email);

      await this.usersRepository.save({ ...user, isActive: true });

      return { message: 'User is activated' };
    } catch (e) {
      throw new BadRequestException('Invalid token');
    }
  }

  public async sendMail(user: IUser) {
    const token = await this.generateToken(user);

    this.mailService.sendVerificationEmail(user.email, token);
  }
}
