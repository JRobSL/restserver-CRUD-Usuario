const {Schema, model} = require('mongoose');

const usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required: true
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});
//podemos sobrescribir el metodo toJSON para eliminar algunos campos que no se desean ver 
usuarioSchema.methods.toJSON = function () {
    //desestructuramos el objeto json que obtenemos 
    // excluyendo el __v y el password 
    //y mediante el operador rest regresamos todos los demas componentes del objeto como usuario
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Usuario', usuarioSchema);