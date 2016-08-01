

//assume a .thenable as the 'monadicFn' return value
var bind = function bind(monadicFn,callback){
    return function bind_cb_wrapper(input){
        var self = this;
        var thenable = monadicFn(input);
        return thenable.then(function thenable_then(monadicValue){
            var nextMonadicFn = callback.apply(self,[monadicValue])
            return nextMonadicFn(input);
        });
    }; 
};

//This is basically just the K(M a) combinator
var result = function result(actualResultValue){
    return function result_returner(dontCare){
        return Promise.resolve(actualResultValue);
    };
};

module.exports = {
    bind:bind,
    result:result
};
