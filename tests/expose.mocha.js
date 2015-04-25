
require('must');
var expose = require('../expose');

describe('expose',function(){
  it('should make modules less imperitive',function(done){
    var
    myModule = {
      a:1
    };
    expose(myModule,{
      b:2,
      c:3
    });
    myModule.exports.mport(function(b,c){
      (b + c).must.be(5);
      done();
    });
  });
});
