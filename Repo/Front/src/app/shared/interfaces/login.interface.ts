export interface Login {
  refreshToken: string
  token: string
  tokenExpires: number
  user: User
}

export interface User {
  id: number
  socialId: string
  firstName: string
  lastName: string
  photo: Photo
  role: Role
  status: Status
  createdAt: string
  updatedAt: string
  deletedAt: any
  saldo: number
}

export interface Photo {
  id: string
  path: string
}

export interface Role {
  id: number
  name: string
  __entity: string
}

export interface Status {
  id: number
  name: string
  __entity: string
}
