import { IsEmail } from 'class-validator'
import { AuthDTO } from './dto/auth.dto'
import { PrismaService } from './../prisma/prisma.service'
import { ForbiddenException, Injectable } from '@nestjs/common'
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { Prisma } from '@prisma/client'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async signUp(dto: AuthDTO) {
        const hash = await argon.hash(dto.password)

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            })

            delete user.hash
            return user
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error
        }
    }
    async signIn(dto: AuthDTO) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        })

        if (!user) throw new ForbiddenException('Cresidential incorrect')

        const pwMatches = await argon.verify(user.hash, dto.password)

        if (!pwMatches) throw new ForbiddenException('Cresidential incorrect')

        delete user.hash
        return user
    }
}
