
//assume a .thenable as the 'monadicFn' return value
var bind = function bind(thenableIn,callback){
    var self = this;
    return thenableIn.then(function thenable_then(monadicValue){
        return callback.apply(self,[monadicValue]);
    });
};

//This is basically just the K(M a) combinator
var result = function result(actualResultValue){
    return Promise.resolve(actualResultValue);
};

module.exports = {
    bind:bind,
    result:result
};
