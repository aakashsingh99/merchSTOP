import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@mernstop.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Aakash Singh',
    email: 'aks@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users