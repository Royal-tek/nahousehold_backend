


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
        return users.filter((user) => user.room === room)
    }

    // For a user to connect to the socket
    io.on("connection", (socket)=>{
        console.log("User has connected");

        socket.on("leaveRoom", () => {
            const user = removeUser(socket.id);
        
            if (user) {
              socket.broadcast.to(user.room).emit("message", { user: 'admin', text: `${user.name} has left` })
        
              // Optionally, you can disconnect the socket
              socket.disconnect();
            }
          });

        socket.on("joinRoom", ({ name, room}, callback) =>{
            const {error, user} = addUser(socket.id, name, room)

            if(error){
                console.log("Username is taken");
                return callback({ error })
            }

            
            socket.emit("message", {user: 'admin', text: `${user.name} welcome to the room ${user.room}`})
            socket.broadcast.to(user.room).emit("message", { user: 'admin', text: `${user.name} has joined`})
            
            socket.join(user.room)

            // Emit the updated number of users in the room
            io.to(user.room).emit("getRoom", {
                room: user.room,
                users: getUsersInRoom(user.room),
                
            });

            socket.on("fetchRoom", () => {
                // Emit the current room data to the requesting client
                io.to(socket.id).emit("getRoom", {
                    room: user.room,
                    users: getUsersInRoom(user.room),
                    });
                });

            // Emit the current user information to the connected client
            io.to(socket.id).emit("getCurrentUser", { user: user.name });

            callback({user})

                
        })

        socket.on("sendMessage", (text, callback)=>{
            const user = getUser(socket.id)
            console.log(user);
            io.to(user.room).emit("message", { user: user.name,  text})

        })


    
        socket.on("disconnect", ()=>{
            removeUser(socket.id)
            console.log("User has disconnected");
        })
    })

}