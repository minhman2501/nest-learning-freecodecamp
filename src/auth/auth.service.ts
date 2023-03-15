import { PrismaService } from './../prisma/prisma.service'
import { Controller, Injectable, Req } from '@nestjs/common'
import { User, Bookmark } from '@prisma/client'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    signIn() {
        return { msg: 'I am Sign In' }
    }

    signUp() {

        return { msg: 'I am Sign Up' }
    }
}
