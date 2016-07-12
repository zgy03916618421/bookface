/**
 * Created by JT on 15/11/27.
 */
var router = require('koa-router')();

var indexCtr = require('../controller/indexController');
router.get('/code',indexCtr.code);

router.get('/start',indexCtr.start);

router.get('/userAuth',indexCtr.userAuth);
router.get('/redirect',indexCtr.redirect);

router.get('/index',indexCtr.index);

router.post('/next',indexCtr.next);

module.exports = router;