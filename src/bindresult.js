
var Promise = require('bluebird');

//"Thenables", which support "Promise Assimilation"
//are already monadic. This can be seen by the seemingly
//trivial implementations below.

//Here, we basically rip the '.then' off of the
//prototype, and use it as a simple function.
var bind = function bind(thenableIn,callback){
    return thenableIn.then(callback);
};

//This definition is too tricky, but is a one-liner ;-)
//var bind = Promise.prototype.then.call.bind(Promise.prototype.then);

//Here we use resolve since it can be used
//to wrap any value being returned from a callback
//used by .then, we bind it to Promise, just in case
var result = Promise.resolve.bind(Promise);

module.exports = {
    bind:bind,
    result:result
};
