const earningsRouter = require('express').Router();
const earningsController = require('./../controllers/earnings');

earningsRouter.post('/:id', earningsController.addEarnings);

earningsRouter.put('/:id', earningsController.updateEarnings);

earningsRouter.get('/:id', earningsController.getEarnings);

module.exports = earningsRouter;
