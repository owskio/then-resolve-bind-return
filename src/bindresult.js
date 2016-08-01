
var bind = function bind(thenableIn,callback){
    return thenableIn.then(callback);
};

var result = Promise.resolve.bind(Promise);

module.exports = {
    bind:bind,
    result:result
};
