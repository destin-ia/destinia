/*jshint esversion: 6 */
// Seeds file that remove all users and create 2 new users
require('dotenv').config();
// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
    .connect('mongodb://localhost/destinia', { useNewUrlParser: true })
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err));

let users = [{
        username: "carlos",
        password: bcrypt.hashSync("carlos", bcrypt.genSaltSync(bcryptSalt)),
        name: "Popino, the Dogtor",
        bio: "Ayer se fue tomo sus cosas y se puso a navegar una camisa un pantalon vaquero y una cancion donde ira, donde ira y decidio batirse en duelo con el mar y recorer el mundo en su velero y navegar laylala navegar. Y se marcho y a su barco le llamo libertad y en le cielo descubrio gavioootas y pinto estelas en el mar",
        photo: "/images/users/popino.jpg"
    },
    {
        username: "javier",
        password: bcrypt.hashSync("javier", bcrypt.genSaltSync(bcryptSalt)),
        name: "Popino, the Dogtor",
        bio: "Ayer se fue tomo sus cosas y se puso a navegar una camisa un pantalon vaquero y una cancion donde ira, donde ira y decidio batirse en duelo con el mar y recorer el mundo en su velero y navegar laylala navegar. Y se marcho y a su barco le llamo libertad y en le cielo descubrio gavioootas y pinto estelas en el mar",
        photo: "/images/users/popino.jpg"
    }
];

User.deleteMany()
    .then(() => { return User.create(users); })
    .then(usersCreated => {
        console.log(`${usersCreated.length} users created with the following id:`);
        console.log(usersCreated.map(u => u._id));
    })
    .then(() => {
        // Close properly the connection to Mongoose
        mongoose.disconnect();
    })
    .catch(err => {
        mongoose.disconnect();
        throw err;
    });