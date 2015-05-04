
var

objectKeys = require('./owski-match').objectKeys,

expose = function(mod,obj){
  obj.mport = objectKeys(obj);
  mod.exports = obj;
  return obj;
};

module.exports = expose;
