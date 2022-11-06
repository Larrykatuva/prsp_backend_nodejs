import { User } from "../database/entities/auth/user";

export default interface loginBody{
    email: string;
    password: string;
}

export default interface loginResponse{
    user: User,
    accessToken: any
}