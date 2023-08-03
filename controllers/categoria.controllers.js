const Categoria  = require('../models/Categoria.js');  

const postCategoria = async(req, res ) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });
    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        });
    }
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria( data );
    await categoria.save();
    res.status(201).json(categoria);

}












module.exports = {
    postCategoria
 
}