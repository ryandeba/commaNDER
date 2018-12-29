(function() {
  /*
    TODO
      make this a thing where you can plug in a list of values and it will output a comma delimited version

      copy button

      optional text qualifier
  */
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
      wrapInSingleQuotes: false
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
      }
    }
  });
})();
