
# Shows the correspondence between promises supporting 'assimilation' and a simple concurrency monad

1) Assume you have a JavaScript promise library.  
2) Assume that said promise libarary supports 'promise assimilation'.  
That is, when in a .then callback, you return a promise, thereby replacing the old one.  
  
Then, you could start writing *monadic* code like this:
```
var myUltimatePromise = 
         bind(httpRequest,   function(response){
  return bind(modulePromise, function(moduleObj){
  return bind(domLoadPromise,function(_dontCare_){
    /* 
     *  ... blah blah blah ... 
     *  var myUltimateResult = 
     *  ... blah blah blah ... 
     */
  return result(myUltimateResult);
  });});});
```

Then you could use the result of *that* promise, 
which would act a lot like a `Promise.all(httpRequest,modulePromise,domLoadPromise)`
