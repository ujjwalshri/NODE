const express = require("express");
const router = express.Router();
const {handleGetAllUsers,getUserById,handleUpdateUserById,handleDeleteUserByID ,handleCreateNewUser} = require('../controllers/user');
// routes 
router.route('/').get(handleGetAllUsers).post(handleCreateNewUser);

// server side rend
// router.get('/' ,async (req,res)=>{
//     const allUsers = await User.find({});
//     let html = `
//     <ul>
//     ${allUsers.map(user => `<li>${user.first_name} - ${user.email}<li>`).join("")}
//     <ul>
//     `
//     return res.send(html);
// })



router.route('/:id')
.get(getUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserByID);





module.exports = router;