import { Controller, Injectable } from '@nestjs/common'
import { User, Bookmark } from '@prisma/client'

@Injectable({})
export class AuthService {
    signIn() {
        return { msg: 'I am Sign In' }
    }

    signUp() {
        return { msg: 'I am Sign Up' }
    }
}
