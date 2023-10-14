const { Server } = require('socket.io');


const creatSocketIo = (server) => {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:3000"]
        }
    });
    io.on("connection", (socket) => {
        console.log("New client connected" + socket.id);
        socket.emit("sendWelcome");

        socket.on("sendDataClient", (data) => {
            socket.broadcast.emit("sendDataServer", data);
        })
        socket.on("start-typingClient", () => {
            socket.broadcast.emit("start-typingServer");
        })
        socket.on("stop-typingClient", () => {
            socket.broadcast.emit("stop-typingServer");
        })
        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
}

module.exports = creatSocketIo;