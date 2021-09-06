import { createHash } from 'crypto'

export default function getId (name: string, district: string, tehsil: string) {
    return createHash('sha256')
        .update(name + district + tehsil)
        .digest('hex')
}