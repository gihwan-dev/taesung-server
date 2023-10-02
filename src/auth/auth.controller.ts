import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto, LoginUserDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post("login")
  createToken(@Body() loginUserDto: LoginUserDto) {
    console.log(loginUserDto);
    return this.authService.createToken(loginUserDto);
  }
}
