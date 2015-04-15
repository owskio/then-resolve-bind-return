
module.exports = function(fn){
  //TODO: Remove comments from within string.
  var args = fn
  .toString()
  .split('{')[0]
  .split(')')[0]
  .split('(')[1]
  .replace(' ','')
  .split(',');
  // .match(/[^,\(\)]+/g);
  // args.shift();
  return args;
};
