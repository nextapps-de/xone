// load stubs in non-production mode
document.write('<script type="text/javascript" src="lib/xone/local/stub.js?token=' + Math.random() + '"></script>');
// load stubs in non-production mode
document.write('<script type="text/javascript">var PLATFORM = MANIFEST.platform;</script>');
// load environment settings
document.write('<script type="text/javascript" src="config/' + MANIFEST.env + '.js?token=' + Math.random() + '"></script>');
// load stubs in non-production mode
document.write('<script type="text/javascript" src="lib/xone/local/env.js?token=' + Math.random() + '"></script>');
// start loader in non-production mode
document.write('<script type="text/javascript" src="lib/xone/local/loader.js?token=' + Math.random() + '"></script>');
