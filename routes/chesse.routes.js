const { Router } = require('express');
const { check } = require('express-validator');
const { validateDocuments} = require('../middlewares/validate.documents.js');
const { validateJWT  } = require('../middlewares/validate.jwt.js');
const { isAdminRole  } = require('../middlewares/validate.role.js');




const {CateExiste,} = require('../helpers/db.validators.js');



const {getCategoria,
      putCate,
      deleteCate,
       postCategoria
      } = require('../controllers/categoria.controllers.js');


const router = Router();

router.get("/",[

      check('objetcId','Objeto no valido').not().isEmpty(),
      check('categoria').custom(CateExiste ),
      

],getCategoria)

router.put("/:id",
[
validateJWT,    
check('categoria').custom(CateExiste ),

       
], putCate);

router.delete("/:id", [
              validateJWT,
                 isAdminRole,   
                   CateExiste,
          check('id', 'No es un ID válido').isMongoId(),
      ], deleteCate );


// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
   validateJWT, 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validateDocuments
], postCategoria );







module.exports = router;