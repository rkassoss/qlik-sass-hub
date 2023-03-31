import enigma from 'enigma.js'

const schema = require("enigma.js/schemas/3.1.json")

//create a new session
const session = enigma.create({
    schema,
    url: 'ws://localhost:4848/app/engineData'
})

export default session.open().then(global => {
   return global
});