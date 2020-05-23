const register = function (Handlebars) {
  var helpers = {
    isdefined: function (value) {
      return value !== undefined
    }
  }

  if (Handlebars && typeof Handlebars.registerHelper === 'function') {
    for (var prop in helpers) {
      Handlebars.registerHelper(prop, helpers[prop])
    }
  } else {
    return helpers
  }

}

module.exports.register = register
module.exports.helpers = register(null)