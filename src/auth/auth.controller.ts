import { Controller, Post, Body, Patch, Req, Ip } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto, LoginUserDto } from "./dto/create-auth.dto";
import { UpdateNameDto } from "./dto/update-auth.dto";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post("login")
  createToken(@Body() loginUserDto: LoginUserDto) {
    return this.authService.createToken(loginUserDto);
  }

  @Patch("name")
  async updateName(@Body() updateNameDto: UpdateNameDto) {
    return await this.authService.updateName(updateNameDto);
  }

  @Post("token")
  async createFCMToken(@Body() body, @Ip() ip: string) {
    return await this.authService.createFCMToken(body.token, ip);
  }
}
