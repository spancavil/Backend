const express = require ('express');
const morgan = require('morgan');

class Server {
    constructor(PORT){
        this.PORT = PORT;
        this.app = express();


        this.newServer = function() {
            this.app.use(morgan('tiny'));

            this.server = this.app.listen(this.PORT, () => {
                console.log(`Server listening at: http://localhost:${this.PORT}`);
            })

            this.server.on('error', error => {
                console.log('Error at server: ', error);
            })
        }

        this.newServer();
    }
}

//arg1 sería el puerto, hay que especificarlo luego en el require.
module.exports = (arg1) => { return new Server( arg1 ) }