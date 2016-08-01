
require('must');
var Promise = require('bluebird');
var br = require('../src/bindresult');
var bind = br.bind;
var result = br.result;

var helloPromise = result('Hello');
var againPromise = result(' again!');

describe('bindResult',function(){
    
    it('should nominally bind existing promises',function(done){
        var nominalCase = 
               bind(helloPromise,function(hello){
        return bind(againPromise,function(again){
        return result(hello + again);
        });});
        
        bind(nominalCase,function(greeting){
            greeting.must.eql('Hello again!');
            return result(done());
        });
        
    });
    
  it('should obey right identity',function(done){
    //https://wiki.haskell.org/Monad_laws
     
    //helloPromise would be the "m" mentioned in the link above
    //This one is the "m >>= return" mentioned in the link above
    var helloRedundant = bind(helloPromise,result);
      
    //Bind everything together just to make the assertion
    var assertion =
           bind(helloPromise,function(hello){
    return bind(helloRedundant,function(helloPerhaps){
        hello.must.eql(helloPerhaps);
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
    var addBeautiful = function(hello){
      return result(hello + ' beautiful ');
    };
    var addWorld = function(helloBeautiful){
      return result(helloBeautiful + ' world!');
    };

    var leftAssociative = bind(bind(helloPromise,addBeautiful),addWorld);
    var rightAssociative = 
           bind(helloPromise,function(hello){
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
