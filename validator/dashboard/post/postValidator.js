const { body } = require('express-validator');
const cheerio = require('cheerio');

module.exports = [
    body('title')
        .not().isEmpty().withMessage('Titile Cannot Be Empty')
        .isLength({ max: 100 }).withMessage('Title Cannot be Greater Than 100 Chars')
        .trim()
    ,
    body('body')
        .not().isEmpty().withMessage('Body Cannot Be Empty')
        .custom(value => {
            let $ = cheerio.load(value)
            let text = $.text()

            if (text.length > 500) {
                throw new Error('Body Cannot Be Greater Than 5000 Chars')
            }

            return true
        })
    
]