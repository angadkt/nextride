import bcrypt from 'bcrypt'

export const hashPassword = async (password)=>{
    return await bcrypt.hash(password,10)
}

export const comparePassword = async(password, newPassword)=> {
    const dcrypted =   await bcrypt.compare(password, newPassword)
    return dcrypted
}