/**-----------------------------
 * @desc Register New User
 * @route /api/auth/register
 * @method POST
   {
    "username": "taha",
    "email":"taha@gmail.com",
    "password":"Taha123Taha123@@"
   }
 -----------------------------**/
/**-----------------------------
 * @desc Login User
 * @route /api/auth/login
 * @method POST
   {
    "email":"taha@gmail.com",
    "password":"Taha123Taha123@@"
   }
 -----------------------------**/
/**-----------------------------
 *  @desc Get All Users WithOut Passwords
 * @route /api/user
 * @method GET
-----------------------------**/
/**-----------------------------
 * @desc Get User profile
 * @route /api/user/profile/:id
 * @method GET
-----------------------------**/
/**-----------------------------
 * @desc Update User profile
 * @route /api/user/profile/:id
 * @method PUT
 {
 "email":"taha12@gmail.com",
 "password":"Taha123Taha123@@"
 }
-----------------------------**/
/**-----------------------------
 * @desc Get Users Count
 * @route /api/user/count
 * @method GET
-----------------------------**/
/**-----------------------------
 * @desc Delete User Profile
 * @router /api/user/profile/:id
 * @method DELETE
-----------------------------**/
/**-----------------------------
 * @desc Add New Post 
 * @router /api/post
 * @requires Bearer Token
 * @method POST
-----------------------------**/