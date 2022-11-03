const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const sendEmail = require("../../middleware/sendEmail");

/*@route  api/user/signup
  @desc   this end point used to register new user
  @access Public this api will accessable to anyone
*/
router.post(
    "/signup",
    [
        body("name", "Name is required").notEmpty().isLength({ min: 3 }),
        body("password", "Password is required").not().isEmpty(),
        body("email", "Email is required").isEmail(),
        body("profileImage", "Image is required").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        // if error then this if statement will execute and return
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), code: 400 });
        }

        /*if there no errror then this try catch statement will execute*/
        try {
            /* Destructuring values from body */
            const { name, password, email, profileImage } = req.body;

            /*checking user with email addresss is already registered or not is registered then we will throw error*/
            let user = await User.findOne({ email });
            if (user) {
                return res
                    .status(400)
                    .json({
                        error: "User with this email address already registered",
                        code: 400,
                    });
            }

            /*if there is not any error
              hashing password useing bcrypt*/
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(password, salt);

            user = new User({
                name: name,
                email: email,
                password: secPassword,
                profileImage: profileImage,
            });

            await user.save();

            /*this payload will used to generate jsonweb token*/
            const payLoad = {
                user: {
                    id: user.id,
                },
            };

            /* this will generate jsonweb token using jsonwebtoken and this token will expiresIn 30min*/
            jwt.sign(
                payLoad,
                process.env.JWTSECRET,
                { expiresIn: 30000 },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({ token: token });
                }
            );
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Internal Server error", code: 500 });
        }
    }
);

/*
 @route  api/user/login
 @desc   this end point is used login 
 @access Public end point any one can access this end point
*/
router.post(
    "/login",
    [
        body("email", "Email is required").isEmail(),
        body("password", "Password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        /* if error then this if statement will execute and return*/
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), code: 400 });
        }

        try {
            /* Destructuring values from body */
            const { password, email } = req.body;
            /* checking user with email addresss is already registered or not is registered then we will throw error */
            let user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ error: "Invalid credentials", code: 400 });
            }

            /* check password is correct or not */
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ error: "Invalid credentials", code: 400 });
            }

            const payLoad = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payLoad,
                process.env.JWTSECRET,
                { expiresIn: "1m" },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({ token: token, code: 200 });
                }
            );
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Internal Server error", code: 500 });
        }
    }
);

/*
 @route  api/user/detail
 @desc   this end point is used to fetch loged in user detail
 @access private end point onlu user accessable end point
*/
router.get("/detail", auth, async (req, res) => {
    try {
        /* Find user by id and send in response */
        const user = await User.findById(req.user.id).select("-password");

        res.status(200).json({ user: user, code: 200 });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server error", code: 500 });
    }
});

/*
 @route  api/user/alluser
 @desc   this end point is used to fetch all suer
 @access private end point only owner accessable end point
*/
router.get("/alluser", auth, async (req, res) => {
    try {
        const user = await User.find().select("-password");

        res.status(200).json({ user: user, code: 200 });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server error", code: 500 });
    }
});

/*
 @route  api/user/resetpasswordsendemail
 @desc   this end point is used to send email to the user who want to change his/her password
 @access private end point only useer accessable end point
*/
router.post(
    "/resetpasswordsendemail",
    [body("email", "Email is required").isEmail()],
    async (req, res) => {
        const errors = validationResult(req);
        // if error then this if statement will execute and return
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array(), code: 400 });
        }

        try {
            const { email } = req.body;

            let user = await User.findOne({ email: email });
            /* If user is not found then this condition will execute and return the mentioned error */
            if (!user) {
                return res.status(404).json({ error: "User not found", code: 404 });
            }

            /* 
              @todo Need to return something if email is sent to the user successfully then the res message will sent in the response othewise throw error
              */
            sendEmail(email, user._id);

            /* If the email is successfully sent to the user then this message will sent in the respoonse with status code 200 */
            res
                .status(200)
                .json({
                    message:
                        "We send reset password link on your email kindly visit reset password page and reset password",
                    code: 200,
                });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ err: "internal server error", code: 500 });
        }
    }
);

/*
  @route    api/user/forgotPassword/:email/:uuid
  @desc     This route is used to render static page for resenting password
  @access   private end point only user accessable end point  
*/
router.get("/forgotPassword/:email/:uuid", (req, res) => {
    res.sendFile(__dirname + "/static/forgotpassword.html");
});

/*
  @route    api/user/resetpassword
  @desc     This route is used to update password
  @access   private end point only user accessable end point  
*/
router.post(
    "/resetpassword/:id",
    [
        body("password", "Password is required").notEmpty().isLength({ min: 3 }),
        body("confirmpassword", "confirm password is required")
            .notEmpty()
            .isLength({ min: 3 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        // if error then this if statement will execute and return
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), code: 400 });
        }

        try {
            const { password, confirmpassword } = req.body;

            if (password !== confirmpassword) {
                return res
                    .status(400)
                    .json({ err: "Please check confirm password", code: 400 });
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt);

            let user = await User.findById(req.params.id);

            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                return res
                    .status(400)
                    .json({
                        err: "Uses New Password you used this password before",
                        code: 400,
                    });
            }

            if (!user) {
                return res.status(404).json({ err: "User not found", code: 404 });
            }

            if (password) user.password = secPass;

            await user.save();

            res
                .status(200)
                .json({ message: "Password changed successfully", code: 200 });
        } catch (error) {
            res
                .status(500)
                .json({
                    err:
                        error.kind === "ObjectId"
                            ? "User with this id not found"
                            : "Internal server error",
                    code: 500,
                });
        }
    }
);

/*
  @route    api/user/editeprofile
  @desc     This route is used to edite user profile
  @access   private end point only user accessable end point  
*/
router.post("/editeprofile", auth, async (req, res) => {
    try {
        const { name, email, profileImage, id } = req.body;

        let user = await User.findById({ _id: req.user.id }).select("-password");

        if (!user) {
            return res.status(404).json({ err: "User not found", code: 404 });
        }

        if (user._id.toString() !== req.user.id) {
            return res.status(400).json({ error: "Not authorised", code: 400 });
        }

        if (name) {
            user.name = name;
        }

        if (email) {
            user.email = email;
        }

        if (profileImage) {
            user.profileImage = profileImage;
        }

        await user.save();

        res.status(200).json({ user, code: 200 });
    } catch (error) {
        res
            .status(500)
            .json({
                err:
                    error.kind === "ObjectId"
                        ? "User with this id not found"
                        : "Internal server error",
                code: 500,
            });
    }
});

router.delete("/delete/user", auth, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ err: "User not found", code: 404 });
        }

        if (user._id.toString() !== req.user.id) {
            return res.status(400).json({ error: "Not authorised", code: 400 });
        }

        await user.remove();

        res.status(200).json({ msg: 'user removed successfully ', code: 200 })

    } catch (error) {
        console.error(error.message);
        res
            .status(500)
            .json({
                err:
                    error.kind === "ObjectId"
                        ? "User with this id not found"
                        : "Internal server error",
                code: 500,
            });
    }
});

module.exports = router;
