const { body } = require('express-validator')

module.exports = [
    body('email')
        .not().isEmpty().withMessage('Email Can Not be Empty'),
    body('password')
        .not().isEmpty().withMessage('Passwor Can Not Be Empty')

]