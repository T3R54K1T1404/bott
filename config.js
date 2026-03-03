import { createRequire } from 'module'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const require = createRequire(__dirname)

global.owner = [
    ['628xxxxxxxxxx', 'Owner Name', true]
]

global.mods = []

global.namebot = 'Nao Bot'

global.nomorown = '628xxxxxxxxxx'

global.wm = `*Powered by ${global.namebot}*`

global.stickpack = global.namebot
global.stickauth = global.owner[0][1] || 'Owner'

global.autotyping = false
global.autorecording = false

global.lopr = 200
global.lolm = 30
global.multiplier = 1

global.APIs = {
    'xsvs': 'https://kepo.xsvs.repl.co'
}

global.APIKeys = {
    'https://kepo.xsvs.repl.co': ''
}
