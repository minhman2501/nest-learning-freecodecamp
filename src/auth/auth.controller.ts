import { AuthDTO } from './dto'
import { AuthService } from './auth.service'
import { Body, Controller, Post } from '@nestjs/common'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signUp(@Body() dto: AuthDTO) {
        return this.authService.signUp(dto)
    }

    @Post('signin')
    signIn(@Body() dto: AuthDTO) {
        return this.authService.signIn(dto)
    }
}
