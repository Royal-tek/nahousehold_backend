


exports.initializeSocket = (server)=>{
    const io = require('socket.io')(server, {
        cors:true,
        origins:[""],
    });

    const users = []

    const addUser = (userId, name, room)=>{
        const exisitingUser = users.find((user) => user.room === room && user.name === name)
            if(exisitingUser) return { error: "Username is taken" }
        
        const user = { userId, name, room}
        users.push(user)
        return { user }
    }

    const removeUser = (userId) =>{
        const index = users.findIndex((user) => user.userId === userId)

        if(index !== -1){
            return users.splice(index, 1)[0]
        }
        
    }

    const getUser = (userId) => {
        return users.find((user) => user.userId === userId)
    }

    const getUsersInRoom = (room)=>{
        users.filter((user) => user.room === room)
    }

    // For a user to connect to the socket
    io.on("connection", (socket)=>{
        console.log("User has connected");

        socket.on("joinRoom", ({ name, room}, callback) =>{
            const {error, user} = addUser(socket.id, name, room)
            console.log(user);

            if(error) return callback(error)
            
            socket.emit("message", {user: 'admin', text: `${user.name} welcome to the room ${user.room}`})
            socket.broadcast.to(user.room).emit("message", { user: 'admin', text: `${user.name} has joined`})
            
            io.to(user.room).emit("userJoined", { user })

            socket.join(user.room)

           
        })

        socket.on("sendMessage", (message, callback)=>{
            const user = getUser(socket.id)
            console.log(user);
            io.to(user.room).emit("message", { user: user.name,  message})

        })


    
        socket.on("disconnect", ()=>{
            console.log("User has disconnected");
        })
    })

}