

//assume a .thenable as the 'monadic' value

var bind = function(monadicFn,callback){
    console.log('monadicFn: ',monadicFn);
    console.log('callback: ',callback);
    return function(input){
        console.log('input: ',input);
        var self = this;
        var thenable = monadicFn(input);
        return thenable.then(function(monadicValue){
            console.log('monadicValue: ',monadicValue);
            return callback.apply(self,[monadicValue])(input);
        });
    }; 
};

//var result = function(actualResultValue){
//    console.log('4');
//    return Promise.resolve(actualResultValue);
//};
var result = function(actualResultValue){
    console.log('4');
    return function(dontCare){
    console.log('5');
        return Promise.resolve(actualResultValue);
    };
};

module.exports = {
    bind:bind,
    result:result
};
