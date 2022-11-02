export class User {
  _id!: string
  email!: string
  passwordHash!: string;
  isAdmin!: boolean
  token?:string
}
