# Asynchronous Non-Blocking Processing

> __Note:__ Work in progress.

### API Overview

Global Switches:


* `CONFIG_SUCCESSIVE_PAINT`
* `CONFIG_PRIORITIZE_PAINT`
* `CONFIG_MAX_RECURSION`

Global Methods:

* __`queue`__: function(namespace<, dependencies>, factory<, bind>)
* __`stack`__: function(namespace<, callback, bind>)
* __`async`__: function(namespace<, target>)
* __`asap`__: function(namespace<, target>)
* __`paint`__ _(in progress)_

Whenever you have some workload to be executed in background, use the queue/stack methods.

##### Core.async

Schedule its own dedicated timer and doesn't queue these jobs. Not intended for massive creation. When multiple tasks created at once, each task has its own timer. A Task never blocks (waits) another task.

##### Core.queue / CORE.stack

Queue the task. 

Schedule its own dedicated timer and doesn't queue these jobs. Not intended for massive creation. When multiple tasks created at once, each task has its own timer. A Task never blocks (waits) another task.



Adds a task to the end of the queue.
```javascript
CORE.queue(function(){

    // do some work in 1 second
});
```


```javascript
CORE.queue(function(){

    // do some work in 1 second
    
}, 'my-task-id');
```

Adds a task to the beginning of the queue.
```javascript
CORE.stack(function(){

    // do some work in 1 second
});
```

```javascript
CORE.stack(function(){

    // do some work in 1 second
    
}, 'my-task-id');
```


Schedule a task to perform asynchronously:
```javascript
CORE.async(function(){

    // do some work
});
```

Schedule a task with an granted initial delay:
```javascript
CORE.async(function(){

    // do some work in 1 second
    
}, 1000);
```

Clearing a scheduled task before execution:
```javascript
var task = CORE.async(function(){}, 1000);

CORE.clear(task);
```

Allows only one single task to be scheduled per ID:
```javascript
CORE.async(function(){

    console.log(1);
    
}, 1000, 'my-task-id');
CORE.async(function(){

    console.log(2);
    
}, 1000, 'my-task-id');
CORE.async(function(){

    console.log(3);
    
}, 1000, 'my-task-id');
```
This example will output '3' after 1 second, the other 2 tasks was overridden by the last definition.
This is really helpful, so we recommended to pass in static timer ids whenever possible.



```javascript
CORE.asap(function(){

    // do some work in 1 second
    
});
```

```javascript
CORE.promise(function(){

    // do some work in 1 second
    
}).then(function(){

    // do some work when task has finished
});
```

Full example, last 2 parameters are optionally:
```javascript
CORE.paint(function(){

    // do some work on next screen refresh
});
```

Full example with delay and task singleton id reference, last 2 parameters are optionally:
```javascript
CORE.paint(function(){

    // do some work in 1 second
    
}, 500, 'my-task-id');
```
