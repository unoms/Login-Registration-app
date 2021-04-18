const app = require('./app')
const config = require('./config')

const PORT = process.env.PORT || config.PORT

app.listen(PORT, ()=>{
    console.log(`Server has been started on port ${PORT}`)
})