import { User } from "../../database/entities/auth/user";
import { Role, UserRole } from '../../database/entities/auth/role';
import { Repository } from "typeorm";
import { databaseConfig } from '../../database/config';
import bcrypt from 'bcryptjs';
import { NodeMailer } from "../../utils";
import loginBody from "../../interface/user";
import jwt from 'jsonwebtoken';


export default class UserHelper {
    private static userRepository: Repository<User> = databaseConfig.getRepository(User)
    private static roleRepository: Repository<Role> = databaseConfig.getRepository(Role)
    private static nodemailer: NodeMailer = new NodeMailer()

    /**
     * This method receives password string and return encrypted hashed string
     * @param password
     * @private
     */
    private static encryptPassword(password: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    private static decryptPassword(user: User, password: string): boolean {
        return user && bcrypt.compareSync(password, user.password);
    }

    /**
     * Generate random string of exactly 5 random characters
     * @private
     */
    private static generateRandomString(): string {
        return Math.random().toString(36).slice(2, 7);
    }

    private static generateAccessToken(user: User): Object {
        const expiry = Math.floor(Date.now() / 1000) + (60 * 60)
        const accessToken: string = (jwt.sign({
            exp: expiry,
            user: user
        },
            'qwerty'
        ));
        return { accessToken: accessToken, expiry: expiry };
    }

    /**
     * Creates a user account and sends an activation code to the
     * supplied user email.
     * @param user
     */
    public static async registerUser(user: User): Promise<User | null> {
        const exists = await this.userRepository.findOneBy({
            email: user.email,
        })
        if (!exists) {
            user.password = this.encryptPassword(user.password)
            user.code = this.generateRandomString()
            const clientRole: Role | null = await this.roleRepository.findOneBy({
                role: UserRole.CLIENTUSER
            })
            if (clientRole) user.roles = [clientRole]
            await this.nodemailer.sendEmail(user.email, "Account activation", "<b>Account created successfully</b>")
            return this.userRepository.save(user)
        }
        exists.password = ''
        throw new Error(`User with email ${user.email} already exist`)
    }

    /**
     * Login user and returns user details and an access token
     * @param user
     */
    public static async loginUser(user: loginBody): Promise<any | null> {
        const exists = await this.userRepository.find({
            where: { email: user.email },
            relations: {
                roles: true,
            },
        })
        if (!exists[0]) {
            throw new Error(`Email ${user.email} does not exist`)
        }
        const validDetails: boolean = this.decryptPassword(exists[0], user.password)
        if (!validDetails) {
            throw new Error(`Invalid login details`)
        }
        exists[0].password = ''
        const accessToken: any = this.generateAccessToken(exists[0])
        return { user: exists[0], accessToken: accessToken }
    }

    /**
     * Activates user account with a reset code and deletes
     * the reset code.
     * @param code
     */
    public static async verifyActivationCode(code: string): Promise<string> {
        const exists = await this.userRepository.findOneBy({
            code: code,
        })
        if (!exists) throw new Error(`The activation code ${code} is invalid or has expired`)
        if (!exists) throw new Error(`User account already active`)
        await this.userRepository.update({
            code: code
        }, {
            isActive: true,
            code: ''
        })
        return 'Account activated successfully'
    }

    /**
     * Generates a reset code and sends it to the supplied email
     * @param email
     */
    public static async requestResetCode(email: string): Promise<string> {
        const exists = await this.userRepository.findOneBy({
            email: email,
        })
        if (!exists) throw new Error(`Email ${email} does not exist`)
        const code: string = this.generateRandomString()
        await this.userRepository.update({
            email: email
        }, {
            code: code
        })
        await this.nodemailer.sendEmail(email, "Reset Account",
            `<p>Your reset code is: ${code}</p>`
        )
        return 'Account reset code has been sent to your email'
    }

    /**
     * Validates activation code and updates user password
     * @param code
     * @param password
     */
    public static async setNewPassword(code: string, password: string): Promise<string> {
        const exists = await this.userRepository.findOneBy({
            code: code,
        })
        if (!exists) throw new Error(`The activation code ${code} is invalid or has expired`)
        const encryptedPassword: string = this.encryptPassword(password);
        await this.userRepository.update({
            code: code
        }, {
            password: encryptedPassword
        })
        return 'Account password updated successfully'
    }

}