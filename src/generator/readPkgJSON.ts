import { readFileSync } from 'fs'
import { dirname } from 'path'
import pkgUp from 'pkg-up'

export default function readPkgJSON () {
    const packageJSONPath = pkgUp.sync()
    const packageJSON = JSON.parse(readFileSync(packageJSONPath, 'utf-8'))
    return { 
        dir: dirname(packageJSONPath),
        path: packageJSONPath, 
        packageJSON,
    }
}
