export interface IAuthData {
    user: User
    token: string
  }
  
  export interface User {
    authentication: Authentication
    _id: string
    username: string
    email: string
    __v: number
  }
  
  export interface Authentication {
    password: string
    salt: string
  }
  

