
module.exports = function(fn){
  //TODO: Remove comments
  var args = fn
  .toString()
  .split('{')[0]
  .replace(' ','')
  .match(/[^,\(\)\s]+/g);
  args.shift();
  return args;
};
