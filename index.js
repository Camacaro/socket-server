// Servidor de Express
const express = require('express');
const app = express();

// Servidor de sockets
const server = require('http').createServer(app);

// Configuracion del socket server
const io = require('socket.io')(server);

// Desplegar directorio publico
app.use( express.static( __dirname + '/public' ) );

// socket, es el cliente conectado
io.on('connection', ( socket ) => {
  console.log('Cliente conectado: ',  socket.id);

  // Emitir eventos 
  socket.emit( 'mensaje-bienvenida', {
    msg: ' Bienvenido al serser',
    date: new Date()
  } );

  // Escuchar eventos
  socket.on( 'mensaje-clente', (data) => {
    console.log(' [mensaje-clente] El cliente emitio algo: ', data)
  } )

  socket.on( 'mensaje-to-server', (data) => {
    console.log(' [mensaje-to-server] El cliente emitio algo: ', data)

    // Enviar al cliente 
    // socket.emit( 'mensaje-from-server', data);
    // Enviar a todo el mundo
    io.emit( 'mensaje-from-server', data);
  } )
});

server.listen(8080, () => {
  console.log('Servidor Corriendo en el puerto 8080')
});