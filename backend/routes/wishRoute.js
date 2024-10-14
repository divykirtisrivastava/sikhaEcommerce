const express=require('express')
const router=express.Router()
const wishController = require('../controller/wishlistController.js')
const uploads=require('../multerConfig.js')

router.post('/cartSave/:user',wishController.wishSave)
router.get('/getCart/:user', wishController.getWish)
router.delete('/deleteCart/:id/:user', wishController.deleteWish)
router.get('/viewCart/:id',wishController.viewCart)
router.put('/updateCart/:id', wishController.updateCart)
module.exports=router