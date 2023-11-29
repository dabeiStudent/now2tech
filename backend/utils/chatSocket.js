const { Server } = require('socket.io');


const creatSocketIo = (server) => {
    const io = new Server(server, {
        cors: {
            origin: [process.env.app_url]
        }
    });
    io.on("connection", (socket) => {
        console.log("New client connected with ID: " + socket.id);
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
//Tiếp tục sau khi hoàn thành UI for admin page có quản lý chat người dùng

module.exports = creatSocketIo;