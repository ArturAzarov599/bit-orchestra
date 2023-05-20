const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const router = jsonServer.router(path.join(__dirname, '../mock-tool/db.json'));

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(router)

server.listen(5000, () => {
  console.log('JSON Server is running')
})