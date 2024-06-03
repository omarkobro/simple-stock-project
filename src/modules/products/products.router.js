import { Router } from "express";

import * as productController from './products.controller.js';

let router = Router()


// ======================== add product ==========================
router.post("/addProduct", productController.addProduct)


// ======================== get products with user Info  ==========================
router.get("/getProductsWithUserInfo", productController.listAllProductsWithTheirUsersInfo)

// ======================== delete product ==========================
router.delete("/deleteProduct/:_id",  productController.deleteProduct)

// ======================== delete product ==========================
router.put("/updateProduct/:_id",  productController.updateProduct)

// ======================== sort products ==========================
router.get("/sortProducts",  productController.sortProducts)




export default router  