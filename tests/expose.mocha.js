
//For the fluent assertion monkey patches
require('must');

var br     = require('../src/bindresult');
var bind   = br.bind;
var result = br.result;

//Test setup utilities
var helloPromise = result('Hello');
var againPromise = result(' again!');
var addBeautiful = function(hello){
  //Don't forget, this is equivalent to:
  //return Promise.resolve(hello + ' beautiful ');
  return result(hello + ' beautiful ');
};
var addWorld = function(helloBeautiful){
  return result(helloBeautiful + ' world!');
};

//Now we try to show that this concurency monad instance (bind,result)
//is actually a valid monad instance by showing that it satisfies the
//monad laws.

//More info on the monad laws can be found here: 
//https://wiki.haskell.org/Monad_laws

describe('bindResult',function(){
    
  it('should obey right identity',function(done){
     
    //helloPromise would be the "m" mentioned in the link above
    //helloRedundant is the "m >>= return" mentioned in the link above
    var helloRedundant = bind(helloPromise,result);
      
    var act =
           bind(helloPromise,function(hello){
    return bind(helloRedundant,function(helloPerhaps){
        hello.must.eql(helloPerhaps);
        //Since act isn't used in this test, the line below is only useful in that it
        //  1) maintains the integrity of the monadic code by making sure `act` is a promise, and
        //  2) calls the done() function, which signals to mocha that our asynchronous test is done
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
