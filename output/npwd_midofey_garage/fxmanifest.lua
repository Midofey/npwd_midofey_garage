fx_version "cerulean"
game "gta5"
lua54 "yes"

client_script 'client/client.lua'
server_script {
    'server/server.lua',
    '@oxmysql/lib/MySQL.lua',
}

shared_scripts {
    '@es_extended/imports.lua',
    '@ox_lib/init.lua',
  }

ui_page 'web/dist/index.html'

files {
    'web/dist/index.html',
    'web/dist/**/*',
}