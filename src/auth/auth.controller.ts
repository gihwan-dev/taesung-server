import { Controller, Post, Body, Patch } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto, LoginUserDto } from "./dto/create-auth.dto";
import { UpdateNameDto } from "./dto/update-auth.dto";

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
    console.log(updateNameDto);
    return await this.authService.updateName(updateNameDto);
  }
}
