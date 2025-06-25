sap.ui.define([], function () {
  "use strict";
  return {
    capitalize: function (value) {
      if (!value) return "";
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
  };
});
