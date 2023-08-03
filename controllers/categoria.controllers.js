const Categoria  = require('../models/Categoria.js');  
const bcryptjs = require ('bcryptjs');


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



const getCategoria= async(req, res)=>{
    const { hasta, desde } = req.query;
    const query = { estado: true };
//const usuarios = await Usuario.find(query)
//   .skip(Number( desde ))
//   .limit(Number( hasta ))
//const total = await Usuario.countDocuments(query)
    const [ chesse , categoria ] = await Promise.all([
        Cate.countDocuments(query),
        Cate.find(query)
        .populate('usuario', ['nombre', 'email'])
    ]);

    res.json({
        chesse,
        categoria
    });
}
const deleteCate = async (req, res)=>{
    //19.  extraigo y respondo id pasado como parametro desde postman
    const {id} = req.params
    //20. borrado fisico en DB
   /*  const usuario = await Usuario.findByIdAndDelete(id); */
    //21.  borrado virtual.  solo se cambia el estado a false del usuario asociado al id en cuestion
    const categoria = await Cate.findByIdAndUpdate( id, { estado: false } );
    res.json(categoria)
}

const putCate = async (req, res)=>{
    /* 1- http put ini*/
      const { id } = req.params;
      //Extraigo lo que NO necesito que se registre en MONGODB
      // incluyendo el object _id de mongodb
      const { _id, password, googleSignIn, ...resto } = req.body;
      if ( password ) {
          // Encriptar la contraseña
          const salt = bcryptjs.genSaltSync();
          resto.password = bcryptjs.hashSync( password, salt );
  }
      //Busca documento por el id y actualiza lo deseado(resto) de la coleccion.
      const categoria = await Cate.findByIdAndUpdate( id, resto );
      res.json({
          msg:"categoria Actualizado",
          categoria : categoria
      });
       /* 1- http put fin */
  }






module.exports = {
    postCategoria ,
    getCategoria,
    deleteCate,
    putCate

 
}