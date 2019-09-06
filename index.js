const server = require('./server')

const port = 7000;

server.listen(port, () => console.log(`\n API on port ${port} \n`))