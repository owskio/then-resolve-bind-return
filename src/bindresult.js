
//assume a .thenable as the 'monadicFn' return value
var bind = function bind(thenableIn,callback){
    return thenableIn.then(callback);
};

//This is basically just the K(M a) combinator
var result = Promise.resolve.bind(Promise);

module.exports = {
    bind:bind,
    result:result
};
