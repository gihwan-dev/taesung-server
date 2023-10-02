import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateAuthDto, LoginUserDto } from "./dto/create-auth.dto";
import { PrismaService } from "src/prisma.service";
import { comparePassword, hashPassword } from "./utils";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    const { email, password, name } = createAuthDto;
    const exsistingUser = this.prisma.user.findUnique({
      where: { email: email },
    });
    if (exsistingUser) {
      throw new BadRequestException("email already exists");
    }
    const hashedPassword = await hashPassword(password);
    const createUser = this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    if (!createUser) {
      throw new InternalServerErrorException("cannot create user");
    }
    return {
      message: "create user successfully",
    };
  }

  async createToken(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new BadRequestException("email not found");
    }

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException("password not match");
    }

    const token = this.jwt.signAsync({ id: user.email, name: user.name });

    return {
      message: "login successfully",
      token,
    };
  }
}
