
require('must');
var Promise = require('bluebird');
var br = require('../src/bindresult');
var bind = br.bind;
var result = br.result;

describe('bindResult',function(){
  it('should allow the binding of multiple async primitives ',function(done){
      var async1 = function(){
          return Promise.resolve('Hello');
      };
      var async2 = function(){
          return Promise.resolve(' world!');
      };
      var myModule = 
                        bind(async1,function(hello){
                        console.log('hello: ',hello);
          return bind(async2,function(world){
              console.log('world: ',world);
          return result(hello + world);
          });});
      
      bind(myModule,function(unwrapped){
          console.log('unwrapped: ',unwrapped);
          unwrapped.must.eql('Hello world!');
          done();
          return result('Must have passed');
      })();
  });
});
