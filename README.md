
## Shows the correspondence between promises supporting 'assimilation' and a simple concurrency monad

Assume you have a JavaScript promise libarary which supports 'promise assimilation'.  
*That is, when in a .then callback, you return a promise, thereby replacing the old one.*  
Then, this repository's unit tests show that the (Promise.prototype.then,Promise.resolve) methods  
satisfy the same monad laws that (bind,return) do, proving they are an instance of a monad.

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
