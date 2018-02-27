/**
 * Define the hooks in the sample.
 * 
 * @author Shin Feng
 * @date 2018.2.27
 * @version 1.0.0
 * 
 */

var {After, Before} = require('cucumber');

Before({
    tags : "@BaiduSearchWithDataFile or @BaiduSearchWithDataDriven or @BaiduSearchWithParams",
    timeout : this.timeout
}, function(scenario) {
    // Just like inside step definitions, "this" is set to a World instance.
    // It's actually the same instance the current scenario step definitions
    // will receive.

    // Let's say we have a bunch of "maintenance" methods available on our
    // World
    // instance, we can fire some to prepare the application for the next
    // scenario:

    // this.bootFullTextSearchServer();
    // this.createSomeUsers();
});

After(function(scenario) {
    // Again, "this" is set to the World instance the scenario just finished
    // playing with.

    // We can then do some cleansing:

    // this.emptyDatabase();
    // this.shutdownFullTextSearchServer();
    global.access_token = null;
});