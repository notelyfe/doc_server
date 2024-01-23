const { Server } = require("socket.io")
const { updateDocContent, getDocData } = require("../Controllers/docController")

const socketConnection = (socketServer) => {

    const io = new Server(socketServer, {
        pingTimeout: 60000,
        cors: {
            origin: process.env.CLIENT_BASE_URL,
            methods: ["GET", "POST"]
        },
    });

    io.on("connection", socket => {
        socket.on("get-document", async docId => {
            const doc = await getDocData(docId)
            socket.join(docId)
            socket.emit("load-document", doc?.content)

            socket.on("send-changes", delta => {
                socket.broadcast.to(docId).emit("receive-changes", delta)
            })

            socket.on("save-document", async data => {
                updateDocContent(docId, data)
            })
        })
    })
}

module.exports = socketConnection