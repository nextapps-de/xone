goog.provide('CORE.RETINA');
goog.require('CORE');
goog.require('CONFIG');

/**
 * @param {Object<Array<Object<string, string|number>>>} data
 * @param {HTMLElement=} context
 */

CORE.initRetina = function(data, context){

    "use strict";

    var img_width,
        img_height,
        cur_width,
        cur_height,
        last_width,
        last_height,
        node_width,
        node_height;

    var node,
        id,
        set,
        item,
        src = "",
        size,
        scale,
        is_image,
        nodes = (context || document).getElementsByClassName('autosize');

    var dpr = window['devicePixelRatio'] || 1;

    if(nodes.length){

        scale = document.body.getBoundingClientRect().width / document.body.offsetWidth;

        for(var i = 0; i < nodes.length; i++){

            node = nodes[i];
            id = node.dataset['id'] || node.id;
            set = data[id];

            node_width  = (node.clientWidth || node.offsetWidth) * dpr * scale;
            node_height = (node.clientHeight || node.offsetHeight) * dpr * scale;

            if(node.tagName.toLowerCase() === 'img'){

                is_image = true;
                size = "auto";
            }
            else{

                is_image = false;
                size = node['style']['backgroundSize'];
            }

            for(var a = 0; a < set.length; a++){

                item = set[a];

                if(a === 0){

                    img_width = item.width;
                    img_height = item.height;
                    last_width = img_width;
                    last_height = img_height;
                    src = item.src;
                }
                else{

                    cur_width = item.width || Math.round(img_width * (item.zoom / 100));
                    cur_height = item.height || Math.round(img_height * (item.zoom / 100));

                    if(((size === 'contain') && (

                            ((cur_width >= node_width) || (cur_height >= node_height)) &&
                            ((cur_width < last_width) /*|| (cur_height < last_height)*/)

                        )) || (

                            ((cur_width >= node_width) && (cur_height >= node_height)) &&
                            ((cur_width < last_width) /*|| (cur_height < last_height)*/)
                        )){

                        src = item.src;
                        last_width = cur_width;
                        last_height = cur_height;
                    }
                }
            }

            if(is_image){

                node['src'] = src;
            }
            else{

                node['style']['backgroundImage'] = 'url(' + src + ')';
            }
        }
    }
};

// Usage:

/*
initRetina({

    'testimage': [{

        src: '../image_100.jpg',
        width: 3900,
        height: 2616
    },{

        src: '../image_90.jpg',
        zoom: 90
    },{

        src: '../image_80.jpg',
        zoom: 80
    },{

        src: '../image_70.jpg',
        zoom: 70
    },{

        src: '../image_60.jpg',
        zoom: 60
    },{

        src: '../image_50.jpg',
        zoom: 50
    },{

        src: '../image_40.jpg',
        zoom: 40
    },{

        src: '../image_30.jpg',
        zoom: 30
    },{

        src: '../image_20.jpg',
        zoom: 20
    },{

        src: '../image_10.jpg',
        zoom: 10
    }]
});
*/
