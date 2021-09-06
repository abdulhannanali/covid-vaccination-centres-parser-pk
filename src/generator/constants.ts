import pkgUp from 'pkg-up'
import { readJSONSync } from 'fs-extra'
import { dirname, join } from 'path'

export const PKG_JSON_PATH = pkgUp.sync()
export const PKG_JSON_FILE = readJSONSync(pkgUp.sync())
export const PKG_JSON_DIR = dirname(PKG_JSON_PATH)


export const RAW_HISTORY_DIRECTORY = join(
    PKG_JSON_DIR,
    'trackedRawDataHistory'
)

export const RELATIVE_STORAGE_DIRECTORY = join(PKG_JSON_DIR, 'store')
export const PLACES_API_KEY = 'AIzaSyDF0Sb8xlX--j_fiz8QKTiZCFg-DTOeR6w'