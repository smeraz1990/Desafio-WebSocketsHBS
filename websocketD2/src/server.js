const { Socket } = require('dgram')
const express = require('express')
const app = express()
const path = require('path')
const { Server: IOServer } = require('socket.io')
const expressServer = app.listen(8080, () => { console.log('Servisdor conectado pueto 8080') })
const io = new IOServer(expressServer)
const productos = [{ title: "Nuevo Titulo", price: "50.2", thumbnail: "nueva imagen" },
    { title: "Nuevo Titulo2", price: "50.2", thumbnail: "nueva imagen" },
    { title: "Nuevo Titulo3", price: "50.2", thumbnail: "nueva imagen" }
]
const messagesArray = []
app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', socket => {
    console.log(`Nuevo usuario conectado ${socket.id}`)
    socket.on('client:product', productInfo => {
        productos.push(productInfo)
        io.emit('server:productos', productos)
        console.log(productos)
    })
    socket.emit('server:productos', productos)
        //Socket Mensajes
    socket.emit('server:mensajes', messagesArray)
    socket.on('client:menssage', messageInfo => {
        messagesArray.push(messageInfo)
        io.emit('server:mensajes', messagesArray)
            //console.log(messageInfo)
    })
})