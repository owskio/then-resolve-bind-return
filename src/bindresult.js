

//assume a .thenable as the 'monadicFn' return value
var bind = function(monadicFn,callback){
    return function(input){
        var self = this;
        var thenable = monadicFn(input);
        return thenable.then(function(monadicValue){
            var nextMonadicFn = callback.apply(self,[monadicValue])
            return nextMonadicFn(input);
        });
    }; 
};

//This is basically just the K(M a) combinator
var result = function(actualResultValue){
    return function(dontCare){
        return Promise.resolve(actualResultValue);
    };
};

module.exports = {
    bind:bind,
    result:result
};
