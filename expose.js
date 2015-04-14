
var

argList = require('owski-argList'),

mport = function(obj,fn){
  if (typeof(fn) === 'undefined') {
    return function(fn2){
      return mport(obj,fn2);
    };
  } else {
    var results = [],
    desired = argList(fn);
    for(var i in desired){
      results.push(obj[desired[i]]);
    }
    return fn.apply(this,results);
  }
},
expose = function(mod,obj){
  obj.mport = mport(obj);
  mod.exports = obj;
  return obj;
};

module.exports = expose;
