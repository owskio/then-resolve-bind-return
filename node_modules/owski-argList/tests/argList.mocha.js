
require('must');
var argList = require('owski-argList');

describe('argList',function(){
  it('gives a list of desired arguments',function(){
    argList(function(q,w,e,r){})
    .must.eql(['q','w','e','r']);
  });
});
