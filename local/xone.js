// load stubs in non-production mode
document.write('<script type="text/javascript" src="lib/xone/local/stub.js?token=' + Math.random() + '"></script>');
// load stubs in non-production mode
document.write('<script type="text/javascript">goog.provide("PLATFORM"); var PLATFORM = MANIFEST.platform;</script>');
// load environment settings
document.write('<script type="text/javascript" src="config/' + (MANIFEST.env === 'test_bundle' || MANIFEST.env === 'test_lib' ? 'test' : MANIFEST.env) + '.js?token=' + Math.random() + '"></script>');
// load stubs in non-production mode
document.write('<script type="text/javascript" src="lib/xone/local/env.js?token=' + Math.random() + '"></script>');
// load deps in non-production mode
document.write('<script type="text/javascript" src="deps.js?token=' + Math.random() + '"></script>');
// start loader in non-production mode
document.write('<script type="text/javascript" src="lib/xone/local/loader.js?token=' + Math.random() + '"></script>');
