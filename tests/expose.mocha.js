
require('must');
var Promise = require('bluebird');
var br = require('../src/bindresult');
var bind = br.bind;
var result = br.result;

var p1 = Promise.resolve('trying ');
var p2 = Promise.resolve('again!');

describe('bindResult',function(){
    
    it('should nominally bind existing promises',function(done){
        var nominalCase = 
               bind(p1,function(trying){
        return bind(p2,function(again){
        return result(trying + again);
        });});
        
        bind(nominalCase,function(unwrapped){
            unwrapped.must.eql('trying again!');
            return result(done());
        });
        
    });
    
  it('should obey right identity',function(done){
    //https://wiki.haskell.org/Monad_laws
     
    //And this would be the "m" mentioned in the link above
    var tyingPromise = p1;
      
    //This one is the "m >>= return" mentioned in the link above
    var tryingRedundant = bind(p1,result);
      
    //Bind everything together just to make the assertion
    var assertion =
           bind(tyingPromise,function(trying){
    return bind(tryingRedundant,function(tryingResult){
        trying.must.eql(tryingResult);
        return result(done());
    });});
  });

  it('should obey left identity',function(done){
    //https://wiki.haskell.org/Monad_laws
      
    //this is the "f" in the "f x" mentioned, but in a 'monadic' context
    var appendWorld = function(hello){
      return result(hello + ' world!');
    };
      
    var helloWorldMaybe = bind(result('hello'),appendWorld);
      
    //Here, we apply "f" to "x", yielding a monad/promise
    var helloWorldDefinitely = appendWorld('hello');
      
    //Bind everything together for unit testing purposes
    var assert = 
           bind(helloWorldMaybe,function(helloWorldMaybe){
    return bind(helloWorldDefinitely,function(helloWorldDefinitely){
        helloWorldDefinitely.must.eql(helloWorldMaybe);
        return result(done());
    });});
  });

  it('should obey associativity',function(done){
    //https://wiki.haskell.org/Monad_laws
    var hello = result('Hello'); 
    var addBeautiful = function(hello){
      return result(hello + ' beautiful ');
    };
    var addWorld = function(helloBeautiful){
      return result(helloBeautiful + ' world!');
    };

    var leftAssociative = bind(bind(hello,addBeautiful),addWorld);
    var rightAssociative = 
           bind(hello,function(hello){
    return bind(addBeautiful(hello),addWorld);
    });
      
    //Bind everything together for unit testing purposes
    var assert = 
           bind(leftAssociative,function(firstGreeting){
    return bind(rightAssociative,function(secondGreeting){
        firstGreeting.must.eql(secondGreeting);
        return result(done());
    });});

  });

});
