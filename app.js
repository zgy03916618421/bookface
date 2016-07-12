/**
 * Created by JT on 15/11/27.
 */
var koa = require('koa');
var app = koa();
var server = require('koa-static');
var ejs = require('koa-ejs');
var path = require('path');
var router = require('./router/router');
var session = require('koa-session');
// logger

//app.use(function *(next){
//    var start = new Date;
//    yield next;
//    var ms = new Date - start;
//    console.log('%s %s - %s', this.method, this.url, ms);
//});
//
//// response
//
//app.use(function *(){
//    this.body = 'Hello World';
//});

app.use(server(__dirname + '/public'));
ejs(app, {
    root: path.join(__dirname, 'view'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
});

app.keys = ['wish key'];
app.use(session(app));

//app.use(function *(next) {
//    global.childrenCount = 1;
//    yield next;
//});

app.use(router.routes());
    //.use(router.allowedMethods());

//app.use(function *() {
//    yield this.render('error');
//});

app.listen(3010);
console.log('listening on port ' + 3010);