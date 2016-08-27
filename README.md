
## Shows that promise libs with assimilation implement an instance of Monad

Assume you have a JavaScript promise libarary which supports 'promise assimilation'.  
*That is, in a `p1.then` callback, you return a new promise `p3`, replacing the old `p2 = p1.then(...)` one.*  
Then, this repository's unit tests show that the (Promise.prototype.then,Promise.resolve) methods  
satisfy the same monad laws (bind,return) do, proving you can use them to write monadic code.

Then, you could start writing *monadic* code like this:  
```javascript
var myUltimatePromise = 
         bind(httpRequest,   function(response){
  return bind(modulePromise, function(moduleObj){
  return bind(domLoadPromise,function(_dontCare_){
    /* 
     *  ... blah blah blah ... 
     *
     *  var myUltimateResult = 
     *
     *  ... blah blah blah ... 
     */
  return result(myUltimateResult);
  });});});
```
  
Which is identical to:  
```javascript
var myUltimatePromise = 
         httpRequest   .then(function(response){
  return modulePromise .then(function(moduleObj){
  return domLoadPromise.then(function(_dontCare_){
    /* 
     *  ... blah blah blah ... 
     *
     *  var myUltimateResult = 
     *
     *  ... blah blah blah ... 
     */
  return Promise.resolve(myUltimateResult);
  });});});
```
  
Then you could use the result of *that* promise either the way you are used to:  
```javascript
myUltimatePromise.then(function(myUltimateResult){
  // ... blah blah blah ...
});
``` 
  
Or you could do so using our implemented (bind,result) interface:  
```javascript
bind(myUltimatePromise,function(myUltimateResult){
  // ... blah blah blah ...
});
``` 
