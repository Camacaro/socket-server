
// Servidor de Express
const express = require('express');
// Sercidor
const http = require('http');
// Configuracion del socket server
const socketio = require('socket.io');
// Utils
const path = require('path');

const Socket = require('./Socket');

class Server {

  constructor() {
    
    this.app = express();
    this.port = process.env.PORT;

    // Http server
    this.server = http.createServer( this.app );

    // Configuracion de socket
    this.io = socketio( this.server, { /* configuraciones */ } );
  }

  middlewares() {
    // Desplegar directorio publico
    this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
  }

  configurarSockets() {
    new Socket( this.io );
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares();

    // Inicializar Sockets
    this.configurarSockets();

    // Inicializar Server
    this.server.listen( this.port , () => {
      console.log('Servidor Corriendo en el puerto: ', this.port);
    });
  }


}

module.exports = Server