import { Magic } from '@magic-sdk/admin'
console.log(process.env.MAGIC_SECRET_KEY)
export const magic = new Magic(process.env.MAGIC_SECRET_KEY)
