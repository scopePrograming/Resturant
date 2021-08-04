const express = require('express')

const router = new express.Router()

const User = require('../models/users.model')

const userController = require('../controller/user.controller')

const auth = require('../middleware/auth')


// register user 
router.post('/user/register', userController.uploadedFile().single('userImage'), userController.userRegister)

// get all user
router.post('/user/all', auth.adminAuth, userController.showAllUser)

// get single user
router.get('/user/single/:id', auth.generalAuth, userController.showSingleUser)

// delete acc by admin
router.delete('/user/delUser/:id', auth.adminAuth, userController.deleteUserByAdmin)

// delete acc by user
router.delete('/user/delete', auth.userAuth, userController.deleteUser)

// User edit 
router.patch('/user/edit/:id', auth.generalAuth, userController.uploadedFile().single('userImage'), userController.editUser)

// login to user
router.post('/user/login', userController.userLogin)

router.patch('/admin/activate/:id', auth.adminAuth, async (req, res) => {
    try {
        id = req.params.id
        user = await User.findById(id)
        user.accountStatus = true
        await user.save()
        res.status(200).send({
            status: true,
            message: 'user be activate'
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            error: error.message
        })
    }
})

router.patch('/admin/deactivate/:id', auth.adminAuth, async (req, res) => {
    try {
        id = req.params.id
        user = await User.findById(id)
        user.accountStatus = false
        await user.save()
        res.status(200).send({
            status: true,
            message: 'user be not activate'
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            error: error.message
        })
    }
})

// activate user by rand code (need to func email or phone to activate code)
router.patch('/user/activate', auth.userAuth, async (req, res) => {
    try {
        let code = req.body.activateCode
        if (code == req.user.activateCode) {
            req.user.accountStatus = true
        }


        await req.user.save()
        res.status(200).send({
            status: true,
            message: 'user activate'
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            error: error.message
        })
    }
})

// logout from user
router.post('/user/logout', auth.generalAuth, userController.logOut)

router.post('/user/logoutAll', auth.generalAuth, userController.logOutAll)

module.exports = router