import { Router } from "express";

import * as UserController from './user.controller.js';

let router = Router()


// ======================== get all User ==========================
router.get("/", UserController.listUsers)



// ======================== signUp  ==========================
router.post("/signUp", UserController.signUp)


// ======================== login  ==========================
router.post("/login", UserController.signin)



// ======================== update User ==========================
router.put("/updateUser/:_id", UserController.UpdateUser)

// ======================== delete User ==========================
router.delete("/deleteUser/:_id", UserController.deleteUser)


// ======================== search for a User with a letter and age ==========================
router.get("/searchWithConditions", UserController.searchByLetterAndAge)


// ======================== search within range ==========================
router.get("/searchInRange", UserController.searchinRangeOfAges)

// ======================== get users With Their Products ==========================
router.get("/getUserWithProducts", UserController.getUsersWithTheirProducts)


export default router  