(function() {
  new Vue({
    el: "#app",

    filters: {
      escapeLineBreak: function(value) {
        return value
          .replace(/\n/g, "\\n")
          .replace(/\r/g, "\\r");
      }
    },

    data: {
      expandTitle: false,
      settingsDialog: false,

      input: "",
      rowDelimiter: "\n",
      rowDelimiters: [
        {label: "\\n", value: "\n"},
        {label: "\\r\\n", value: "\r\n"}
      ],
      wrapInSingleQuotes: false,
      prefix: "",
      postfix: "",
      mapFnString: ""
    },

    computed: {
      output: function() {
        return this.inputValues
          .map(this.formatValue)
          .join(this.rowDelimiter);
      },

      inputValues: function() {
        return this.input.replace(/\r/g, "").split(/\n/);
      },

      mapFn: function() {
        var fn;

        try {
          if (this.mapFnString.length > 0) {
            eval("var fn = function(value) { return " + this.mapFnString + " };");
          }

          if (typeof fn != "function") {
            throw("fn is not a function");
          }

          fn("test"); // test it to make sure that it actually executes with a simple string value
        } catch (e) {
          var fn = undefined;
        }

        return fn;
      },

      mapFnStringErrorMessages: function() {
        var errors = [];

        if (this.mapFnString.length > 0) {
          if (typeof this.mapFn != "function") {
            errors.push("Invalid function");
          }
        }

        return errors;
      }
    },

    watch:{
      mapFnString: function() {
        if (typeof this.mapFnString != "string") {
          this.mapFnString = ""; // the clear button sets this to null :(
        }
      }
    },

    methods: {
      formatValue: function(value) {
        value = String(value);

        if (value.length == 0) {
          return value;
        }

        if (typeof this.mapFn == "function") {
          value = this.mapFn(value);
        } else {
          if (this.wrapInSingleQuotes) {
            value = "'" + value + "'";
          }

          value += ",";

          if (this.prefix.length > 0) {
            value = this.prefix + " " + value;
          }

          if (this.postfix.length > 0) {
            value += " " + this.postfix;
          }
        }

        return value;
      },

      paste: function() {
        var self = this;

        navigator.clipboard.readText()
          .then(function(clipboardText) {
            self.input = clipboardText;
          });
      },

      copy: function() {
        var self = this;

        navigator.clipboard.writeText(self.output)
          .then(
            function() { /* success */},
            function() { /* failure */},
          );
      },

      resetWrapSettings: function() {
        this.prefix = "";
        this.postfix = "";
      }
    }
  });
})();
