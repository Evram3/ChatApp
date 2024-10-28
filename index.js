/*
        Real Time Applications:
        Apps mwtzmna zy msln el whatsapp anta btb3t msg s7bk byrd 3alek 3ala twl m4 lsa hy3ml refresh
        
    Spcket.IO:
        El library ele hst5dmha 34an yb2a el site real time app
        Built on webSockets

    WebSockets:
        Zyha zy el http bs el fr2 en
            http: El client byb3t req w el server yrod b res
            WebSockets: El client byb3t ll server w byst2bl fe nfs el w2t kzalk el server nfs el modo3
                        El client w el server byklmo b3d mn 5lal el events
                            Ex: Ktbt hi w dwst enter (enter: event) fa 3mlt publish l event awl ma el event da ywsl ll server, el server hy3ml callback mo3yana
                        Mmkn y connect baktr mn user fe nfs el w2t

    Events:
        EventEmit: emits the event 'newListener' when a new listener are added and 'removeListener' when existing listener are removed

        on: Hya ele bt listen el event

        emit: Lama 7d y3ml spicified event hya ele bt emit el response

        when (on) kza a3mle (emit) kza

        emit --> Publish to an event using emit("eventName", data);
        on --> Listen to event using .on("eventName", callBack Function);

    
    Broadcasting:
        El mswl 3n emiting el event from the server to the rest of the users
        Ex: B3t msg lek 3ala el whatsapp, htwsl ll server fa el BROADCASTING hwa ele hyb3thalk
*/

const express = require('express');
const cors=require('cors')
const app = express();
app.use(cors());
//  Bycreate http server ll app bs instantly

const { join } = require('path');
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

//[In Terminal] npm i --save-dev nodemon

const { Server } = require('socket.io');
//  El server dh m7tag http y4eloh

const http = require('http');
const server=http.createServer(app)
//  3mlt http server ll app bs 3ala twl m4 instantly w kman 34an a2dr ar2b 3alleh el socket server

const io = new Server(server, {
    cors: {
        origin:"http://127.0.0.1:5500"
    }
});
//  Rkb el socket server 3ala el http server

io.on('connection', (socket) => {
    //  Event "connection" el browser hya ele by3mlo emit lw7doh 
    console.log('a user is connected With ID: ', socket.id);
    //  El io (ele hwa bymsl el socket server ele rakb 3ala el http server) awl ma 7d y3ml connection (on) atb3le 'a user is connected'
    //  Bt3ml connection mn el frontend

    socket.on('message', (msg) => {
        //  Lama el socket (server) ysm3 event asmoh "message"
        console.log('MESSAGE: ', msg);
        //  Atb3le el parameter "msg"
        //  El parameter hna ele hya atb3t m3 el emit ele hya "input.value"

        io.emit('send_messages_to_all_users', msg);
        //  Lama el socket (server) ysm3 event "message" 5od el data ele mb3ota m3aha (msg) w ab3tha lkol el nas (io)
        //  W kol el conections (io) y emit event asmoh 'send_messages_to_all_users' w yb3t feh el parameter "msg" as el sent data
        //  io m4 socket, 34an el socket hy send ll connection ele b3de m4 kol el connections (kol el clients)
    });

    socket.on('typing', () => {
        // Lama el socket (server) ysm3 event "typing"
        socket.broadcast.emit("show_typing_status");
        // Ab3t l m3ada el socket (ele hwa el user ele b3t) event asmoh "show_typing_status"
        //  broadcast: Kolh ma 3ada
    });

    socket.on("stop_typing", () => {
        socket.broadcast.emit('clear_typing_status');
    });

    socket.on("disconnect", () => {
        console.log(`User with id ${socket.id} left the chat`);
    });
    //  Lama 7d y2fl el page (yseb el chat)

});


server.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000');
});