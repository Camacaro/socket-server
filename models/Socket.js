
class Socket {  

  constructor( io ) {
    
    this.io = io;
    
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', ( socket ) => {

      socket.on( 'mensaje-to-server', (data) => {
        console.log('[mensaje-to-server] Cliente emitio un valor: ', data);
        
        this.io.emit( 'mensaje-from-server', data);
      } )

    });
  }
}

module.exports = Socket;