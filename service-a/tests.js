var page = require("webpage").create();
page.open("http://service-a", function (status) {
    console.log("Status: " + status);
    phantom.exit();
})
