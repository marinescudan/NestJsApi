import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { User, Bookmark } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService,
        private readonly config: ConfigService,
    ) {}

    public async signup(dto: AuthDto) {
        // generate the password hash
        const hash = await argon.hash(dto.password);
        try {
            // save the user in the database
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
                // select: {
                //     id: true,
                //     email: true,
                //     createdAt: true,
                // },
            });

            // return the user email and token
            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ForbiddenException('Email already exists');
            }
            throw error;
        }
    }

    public async signin(dto: AuthDto) {
        // find the user by email
        const user: User = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        // if user not found throw error
        if (!user) { throw new ForbiddenException('Invalid credentials'); }

        // compare the password hash
        const isPasswordValid = await argon.verify(user.hash, dto.password);

        // if password is not correct throw error
        if (!isPasswordValid) { throw new ForbiddenException('Invalid credentials'); }

        // generate the jwt token
        // return the user and token
        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string): Promise<{access_token: string}> {
        const payload = { id: userId, email: email };
        const secret = this.config.get<string>('JWT_SECRET');
        
        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '30m',
                secret: secret,
            }
        );

        return {
            access_token: token,
        };
    }
}
