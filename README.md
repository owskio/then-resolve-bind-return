
## Shows the correspondence between promises supporting 'assimilation' and a simple concurrency monad
---

1) Assume you have a JavaScript promise library.  
2) Assume that said promise libarary supports 'promise assimilation'.  
(That is, when in a .then callback, you return a promise, thereby replacing the old one.)  
  
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
