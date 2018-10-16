const withSCSS = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withPLUGINs = require("next-compose-plugins");
module.exports = withPLUGINs([[withCSS], [withSCSS]]);
