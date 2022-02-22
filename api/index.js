const router = require('express').Router();
const { models: { User, Car, Sale } } = require('../db');

router.get('/users', async(req, res, next) => {
    try {
        res.send(await User.findAll());
    }
    catch (ex) {
        next(ex);
    }
});

router.get('/cars', async (req, res, next) => {
    try {
        res.send(await Car.findAll());
    }
    catch (ex) {
        next(ex);
    }
});

router.get('/users/:id/sales', async (req, res, next) => {
    //nested route
    try {
        res.send(await Sale.findAll({
            where: {
                userId: req.params.id
            },
            include: [
                Car
            ]
        }));
    }
    catch (ex) {
        next(ex);
    }
});

module.exports = router;