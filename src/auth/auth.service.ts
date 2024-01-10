import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateAuthDto, LoginUserDto } from "./dto/create-auth.dto";
import { PrismaService } from "src/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { UpdateAuthDto, UpdateNameDto } from "./dto/update-auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    const { email, password, name } = createAuthDto;
    const exsistingUser = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (exsistingUser) {
      throw new BadRequestException("email already exists");
    }
    const createUser = await this.prisma.user.create({
      data: {
        email,
        password,
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

    const isPasswordMatch = password === user.password;

    if (!isPasswordMatch) {
      throw new BadRequestException("password not match");
    }

    const token = await this.jwt.signAsync({ id: user.email, name: user.name });

    return {
      message: "login successfully",
      token,
      user,
    };
  }

  async updateName(updateNameDto: UpdateNameDto) {
    const { email, name } = updateNameDto;

    const result = await this.prisma.user.update({
      where: {
        email: email,
      },
      data: {
        name: name,
      },
    });

    if (!result) {
      throw new NotFoundException("해당 유저를 찾지 못했습니다.");
    }

    return {
      name: result.name,
      message: "성공적으로 수정되었습니다.",
    };
  }

  async createFCMToken(token, ip) {
    const existingUser = await this.prisma.user_device.findUnique({
      where: { ip: ip },
    });

    if (existingUser) {
      throw new BadRequestException("ip가 이미 존재합니다.");
    }

    const result = await this.prisma.user_device.create({
      data: {
        ip: ip,
        token: token,
      },
    });

    if (!result) {
      throw new NotFoundException("해당 유저를 찾지 못했습니다.");
    }

    return {
      message: "성공적으로 등록되었습니다..",
    };
  }
}
