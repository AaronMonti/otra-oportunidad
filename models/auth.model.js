const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jobs = require('./job.model')

const AuthSchema = new mongoose.Schema(
    {
        googleId: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        image: {
            type: String,
        },
        password: {
            type: String,
            require: true
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
)
//Methods
//Es encriptando la contraseña para guardarla asi en la DB
//Encriptar algo en una sola via
AuthSchema.methods.passwordEncrypt = async (password) => {
    const salt = await bcrypt.genSalt(10) //Una semilla
    return await bcrypt.hash(password, salt)
}

// Va a comparar el password que le llega del formulario de logueo
// con el password que tiene almacenado en la BD. Para eso vuelve a hash
// la contraseña ingresada en el formulario y la compara con la que esta
// hasheada en la DB
AuthSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password) //true o false
}

module.exports = mongoose.model('Auth', AuthSchema)