const express = require('express');
const router = express.Router();
require('dotenv').config();
const User = require('../../models/User');
const auth = require('../../middleware/auth');

router.put('/followandunfollow/:user_id', auth, async (req, res) => {
    try {

        // find loged in user 
        let followeUser = await User.findById(req.user.id);
        // If user not found by id then this code will execute
        if (!followeUser) {
            return res.status(404).json({ errors: "User not found", code: 404 });
        };

        //if user found then we check first loged in user is already flowing the user or not and if loged in user is already following the user then loaged in user will unfollow the user
        if (followeUser.following.filter(data => data._id.toString() === req.params.user_id).length > 0) {
            // return res.status(400).json({ errors: `Already following ${followeUser.name}` });
            // Finding index of logen in user id
            const findRemoveIndex = followeUser.following.map(data => data._id.toString()).indexOf(req.params.user_id);
            //if user id index number found then we will splice that index number from following array of the user
            followeUser.following.splice(findRemoveIndex, 1);
            // then we will save user user data again
            await followeUser.save();
            // console.log(findRemoveIndex, " followeUser")
        } else {
            //if loged in user is not already flowing the user then we will unshift user id into following array of user and again save this data into database
            followeUser.following.unshift(req.params.user_id);
            await followeUser.save();
        };

        // find user that loged in user want to follow 
        let followingUser = await User.findById(req.params.user_id);

        // If user not found by id then this code will execute
        if (!followingUser) {
            return res.status(404).json({ error: "FollowingUser not found", code: 404 });
        };

        //if user found then we check first user is already follower of the user or not and if loged in user is already follower in the user follower array
        if (followingUser.followers.filter(data => data._id.toString() === req.user.id).length > 0) {
            // return res.status(400).json({ errors: `Already follower of ${followingUser.name}` })

            // Finding index of logen in user id
            const findRemoveIndex = followingUser.followers.map(data => data._id.toString()).indexOf(req.user.id);

            // then we will save user user data again
            followingUser.followers.splice(findRemoveIndex, 1);

            await followingUser.save();
            // console.log(findRemoveIndex, " followingUser")
        } else {
            //if loged in user is not already flowing the user then we will unshift user id into following array of user and again save this data into database
            followingUser.followers.unshift(req.user.id);
            await followingUser.save();
        }

        res.json({ followeUser, followingUser });
    } catch (error) {
        console.error(error)
    }
})
module.exports = router;