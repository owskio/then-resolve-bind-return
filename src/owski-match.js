
//The beginnings of a pattern matching module maybe?

var
argList = require('owski-arglist');

objectKeys = function(obj,fn){
  if (typeof(fn) === 'undefined') {
    return function(fn2){
      return objectKeys(obj,fn2);
    };
  } else {
    var results = [],
    desired = argList(fn);
    for(var i in desired){
      results.push(obj[desired[i]]);
    }
    return fn.apply(this,results);
  }
}

module.exports = {
  objectKeys: objectKeys
};
