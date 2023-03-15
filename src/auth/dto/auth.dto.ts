
import {} from ''

export class AuthDTO {
    @IsEmail
    email: string
    password: string
}
