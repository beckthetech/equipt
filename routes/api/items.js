const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/api/items');

// GET /api/items
router.get('/', itemsCtrl.index);
router.get('/:id', itemsCtrl.show);

// auth protected routes
router.use(require('../../config/auth'));
// process token for routes below
router.post('/', checkAuth, itemsCtrl.create);
router.put('/:id/photo', checkAuth, itemsCtrl.addPhoto);
router.put('/:id', checkAuth, itemsCtrl.update);
router.delete('/:id', checkAuth, itemsCtrl.delete);

// helper functions
function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }

module.exports = router;