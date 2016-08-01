
require('must');
var Promise = require('bluebird');
var br = require('../src/bindresult');
var bind = br.bind;
var result = br.result;

var async1 = function(){
    return Promise.resolve('Hello');
};
var async2 = function(){
    return Promise.resolve(' world!');
};

describe('bindResult',function(){
    
  it('should allow the binding of multiple async primitives ',function(done){
      var myModule = 
                 bind(async1,function(hello){
          return bind(async2,function(world){
          return result(hello + world);
          });});
      
      bind(myModule,function(unwrapped){
          unwrapped.must.eql('Hello world!');
          done();
          return result('Meh, must have passed');
      })();
  });
    
  it('should obey right identity',function(done){
    var shouldSayHello = 
           bind(async1,function(hello){
    return result(hello);
    });
    var shouldAlsoHello = async1;
      
    var test =
           bind(shouldSayHello,function(hello){
    return bind(shouldAlsoHello,function(helloAgain){
        hello.must.eql(helloAgain);
        done();
        return result('Meh, must have passed');
    });})();
  });

  it('should obey left identity',function(done){

    var hello = 'hello';
    var yieldHello = result(hello); 
    var appendWorld = function(hello){
        console.log('hello: ',hello);
        return result(hello + ' world!');
    };
      
    var helloWorldMaybe = bind(yieldHello,appendWorld);
      
    var helloWorldDefinitely = appendWorld(hello);
      
    var assert = 
           bind(helloWorldMaybe,function(helloWorldMaybe){
    return bind(helloWorldDefinitely,function(helloWorldDefinitely){
      
        helloWorldDefinitely.must.eql(helloWorldMaybe);
        done();
        return result('Meh, must have passed');
    });})();

  });

});
