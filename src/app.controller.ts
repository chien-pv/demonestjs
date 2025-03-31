import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { MailerService } from '@nestjs-modules/mailer';

class UserDTO {
  email: string;
  password: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  @Post('/login')
  async login(@Body() user: UserDTO) {
    const accesToken = await this.jwtService.sign(
      { email: user.email },
      { secret: 'HomeSrc', expiresIn: '60s' },
    );

    const refreshToken = await this.jwtService.sign(
      { email: user.email },
      { secret: 'refreshHomeSrc', expiresIn: '1d' },
    );
    return {
      message: 'Login thành công!!!',
      accesToken: accesToken,
      refreshToken,
    };
  }

  @Post('/refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    console.log(refreshToken);
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: 'refreshHomeSrc',
      });

      const accesToken = await this.jwtService.sign(
        { email: payload.email },
        { secret: 'HomeSrc', expiresIn: '60s' },
      );

      return { accessToken: accesToken };
    } catch (error) {
      return { message: 'Token Hết hạn', error };
    }
  }

  @Get()
  @Render('index')
  async getHello() {}
  // async getHello(@Param('id') id: string, @Query('q') q: string) {
  //   this.mailerService
  //     .sendMail({
  //       to: 'chjenbk11@gmail.com', // list of receivers
  //       from: 'chjenbk11@gmail.com', // sender address
  //       subject: 'Testing Nest MailerModule ✔', // Subject line
  //       template: 'mail',
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   return { name: 'ABC' };
  // }
  @Get('/about')
  getAbout() {
    return { id: 12, pass: 'abc' };
  }
}
