const validateMiddleware = (req, res, next) => {
    const {name, year, price} = req.body

    if(!name || !year || !price) {
        return res.status(400).json({message: "All fields are required"})
    }


if (isNaN(price) || isNaN(year)) {
    return res.status(400).json({message: "Price and year must be numbers"})
}


next()
}


module.exports = validateMiddleware