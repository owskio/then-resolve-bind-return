
require('must');

var br     = require('../src/bindresult');
var bind   = br.bind;
var result = br.result;

//Test setup utilities
var helloPromise = result('Hello');
var againPromise = result(' again!');
var addBeautiful = function(hello){
  return result(hello + ' beautiful ');
};
var addWorld = function(helloBeautiful){
  return result(helloBeautiful + ' world!');
};

describe('bindResult',function(){
  //https://wiki.haskell.org/Monad_laws
    
  it('should obey right identity',function(done){
     
    //helloPromise would be the "m" mentioned in the link above
    //helloRedundant is the "m >>= return" mentioned in the link above
    var helloRedundant = bind(helloPromise,result);
      
    var act =
           bind(helloPromise,function(hello){
    return bind(helloRedundant,function(helloPerhaps){
        hello.must.eql(helloPerhaps);
        return result(done());
    });});
  });

  it('should obey left identity',function(done){
      
    var message = 'Goodbye';
    var helloWorldMaybe = bind(result(message),addWorld);
      
    //addWorld is the "f" in the "f x" mentioned in the link above,
    //but in a 'monadic' context.
    //Here, we apply "f" to "x", yielding a monad/promise
    var helloWorldDefinitely = addWorld(message);
      
    var act = 
           bind(helloWorldMaybe,function(helloWorldMaybe){
    return bind(helloWorldDefinitely,function(helloWorldDefinitely){
        helloWorldDefinitely.must.eql(helloWorldMaybe);
        return result(done());
    });});
  });

  it('should obey associativity',function(done){
    
    var leftAssociative = bind(bind(helloPromise,addBeautiful),addWorld);
    var rightAssociative = 
           bind(helloPromise,function(hello){
    return bind(addBeautiful(hello),addWorld);
    });
      
    //Bind everything together for unit testing purposes
    var act = 
           bind(leftAssociative,function(firstGreeting){
    return bind(rightAssociative,function(secondGreeting){
        firstGreeting.must.eql(secondGreeting);
        return result(done());
    });});
  });
});
