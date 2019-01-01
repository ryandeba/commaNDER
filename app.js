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
      input: "",
      rowDelimiter: "\n",
      drawer: true,
      rowDelimiters: [
        {label: "\\n", value: "\n"},
        {label: "\\r\\n", value: "\r\n"}
      ],
      wrapInSingleQuotes: false,
      expandTitle: false
    },

    computed: {
      output: function() {
        return this.inputValues
          .map(this.formatValue)
          .join(this.rowDelimiter);
      },

      inputValues: function() {
        return this.input.replace(/\r/g, "").split(/\n/);
      }
    },

    watch: {
      input: function() {
      }
    },

    methods: {
      formatValue: function(value) {
        value = String(value);

        if (value.length == 0) {
          return value;
        }

        if (this.wrapInSingleQuotes) {
          value = "'" + value + "'";
        }

        value += ",";

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
            function() {},
            function() {},
          );
      }
    }
  });
})();
