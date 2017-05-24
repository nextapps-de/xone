(function(suite){

    var data = {

        id:"id",
        title: 'title',
        startDate: 'startDate',
        endDate:"endDate",
        createdAt:"createdAt",
        updatedAt:"updatedAt",
        commentsCounter:"commentsCounter",
        likes:"likes",
        reslotsCounter:"reslotsCounter",
        creator:"creator",
        location:"location",
        media:"media",
        notes:"notes",
        settings:"settings",
        slotter:"slotter",
        visibility:"visibility"
    };

    var array_keys = [

        'id',
        'title',
        'startDate',
        'endDate',
        'createdAt',
        'updatedAt',
        'commentsCounter',
        'likes',
        'reslotsCounter',
        'creator',
        'location',
        'media',
        'notes',
        'settings',
        'slotter',
        'visibility'
    ];

    var array_values = [

        'id',
        'title',
        'startDate',
        'endDate',
        'createdAt',
        'updatedAt',
        'commentsCounter',
        'likes',
        'reslotsCounter',
        'creator',
        'location',
        'media',
        'notes',
        'settings',
        'slotter',
        'visibility'
    ];

    var big_array = (function(array){

        var array = new Array(1000);

        for(var i = 0; i < 1000; i++){

            array[i] = 'test';
        }

        return array;

    })();

    var big_object = (function(){

        var object = {};

        for(var i = 0; i < 1000; i++){

            object['index_' + i] = 'test';
        }

        return object;

    })();

    suite.add('Access Index in Array', function() {

        return big_array[999];
    });

    suite.add('Access Key in Object (Array Notation)', function() {

        return big_object['index_999'];
    });

    suite.add('Access Key in Object (Object Notation)', function() {

        return big_object.index_999;
    });

    suite.add('Object + hasOwnProperty', function() {

        var tmp = {};

        for(var item in data){

            if(data.hasOwnProperty(item)){

                tmp[item] = data[item] ? true : false;
            }
        }
    });

    suite.add('Object (without hasOwnProperty)', function() {

        var tmp = {};

        for(var item in data){

            tmp[item] = data[item] ? true : false;
        }
    });

    suite.add('Array to Object (Object Keys)', function() {

        var tmp = {};

        for(var i = 0; i < array_keys.length; i++){

            var item = array_keys[i];

            tmp[item] = data[item] ? true : false;
        }
    });

    suite.add('Array to Object (Object Keys + Values)', function() {

        var tmp = {};

        for(var i = 0; i < array_values.length; i++){

            tmp[array_keys[i]] = array_values[i] ? true : false;
        }
    });

    suite.add('Array to Array (Object Keys + Values)', function() {

        /* This method is 30x faster than pure object access */

        var tmp = new Array(array_values.length);

        for(var i = 0; i < array_values.length; i++){

            tmp[i] = array_values[i] ? true : false;
        }
    });

    // add listeners
    suite.on('cycle', function(event) {
        document.getElementById('log').innerHTML += String(event.target) + '<br>';
        //console.log(String(event.target));
    });

    suite.on('complete', function() {
        document.getElementById('log').innerHTML += 'Fastest is ' + this.filter('fastest').map('name') + '<br>';
        //console.log('Fastest is ' + this.filter('fastest').map('name'));
    });

    // run async
    //suite.run({ 'async': true });

    document.getElementById('log').innerHTML = 'Test started ...' + '<br>';

    return suite;

})(new Benchmark.Suite).run({ 'async': true });

/*
 Access Index in Array x 101,780,622 ops/sec ±0.94% (62 runs sampled)
 Access Key in Object (Array Notation) x 87,329,098 ops/sec ±1.00% (63 runs sampled)
 Access Key in Object (Object Notation) x 87,630,098 ops/sec ±0.95% (64 runs sampled)
 Object + hasOwnProperty x 1,939,430 ops/sec ±1.35% (62 runs sampled)
 Object (without hasOwnProperty) x 3,105,092 ops/sec ±1.15% (60 runs sampled)
 Array to Object (Object Keys) x 3,263,127 ops/sec ±1.38% (58 runs sampled)
 Array to Object (Object Keys + Values) x 4,501,592 ops/sec ±0.64% (62 runs sampled)
 Array to Array (Object Keys + Values) x 19,536,749 ops/sec ±0.69% (65 runs sampled)
 */
