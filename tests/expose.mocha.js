
require('must');
var Promise = require('bluebird');
var br = require('../src/bindresult');
var bind = br.bind;
var result = br.result;

var p1 = Promise.resolve('trying ');
var p2 = Promise.resolve('again!');

describe('bindResult',function(){
    
    it('should bind existing promises',function(done){
        //Just a simple 'nominal test case'
        var myModule = 
               bind(p1,function(trying){
        return bind(p2,function(again){
        return result(trying + again);
        });});
        
        bind(myModule,function(unwrapped){
            unwrapped.must.eql('trying again!');
            done();
            return result('Meh, must have passed');
        });
        
    });
    
  it('should obey right identity',function(done){
    //https://wiki.haskell.org/Monad_laws
     
    var shouldSayTrying = 
           bind(p1,function(trying){
      return result(trying);
    });
      
    //This one is the "m >>= return" mentioned in the link above
    var shouldSayTryingAgain = bind(p1,result);
      
    //And this would be the "m" mentioned in the link above
    var shouldAlsoSayTrying = p1;
      
    //Bind everything together just to make the assertion
    var test =
           bind(shouldSayTrying,function(tryingLambdaResult){
    return bind(shouldSayTryingAgain,function(tryingResult){
    return bind(shouldAlsoSayTrying,function(trying){
        trying.must.eql(tryingResult);
        trying.must.eql(tryingLambdaResult);
        tryingResult.must.eql(tryingLambdaResult);
        done();
        return result('Meh, no exceptions, must have passed');
    });});});
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
        done();
        return result('Meh, must have passed');
    });});
  });

    
  it('should obey associativity',function(done){
    //https://wiki.haskell.org/Monad_laws
      
    var addHello = Promise.resolve('Hello'); 
      
    var addBeautiful = function(hello){
      console.log('returning hello beautiful: ',hello);
      return Promise.resolve(hello + ' beautiful ');
    };
    var addWorld = function(helloBeautiful){
      console.log('returning hello beautiful world: ',helloBeautiful);
      return Promise.resolve(helloBeautiful + ' world!');
    };

    var firstTwo = bind(addHello,addBeautiful);
      console.log('firstTwo: ',firstTwo);
    var leftAssociative = 
        bind(
            firstTwo,
            addWorld
        );
    var rightAssociative = 
        bind(addHello,function(hello){
            return bind(addBeautiful(hello),addWorld);
        });
      
    //Bind everything together for unit testing purposes
    var assert = 
           bind(leftAssociative,function(firstGreeting){
               console.log('firstGreeting: ',firstGreeting);
    return bind(rightAssociative,function(secondGreeting){
      
        firstGreeting.must.eql(secondGreeting);
        done();
        return result('Meh, must have passed');
    });});

  });

});
