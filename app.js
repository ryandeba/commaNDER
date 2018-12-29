(function() {
  /*
    TODO
      make this a thing where you can plug in a list of values and it will output a comma delimited version

      copy button

      optional text qualifier
  */
  new Vue({
    el: "#app",

    components: {
    },

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
      ]
    },

    computed: {
      output: function() {
        var output = this.input;

        output = output.replace(/\r/g, "");

        var values = output.split(/\n/);

        values = values
          .map(String)
          .map(function(value) {
            return value.length > 0 ? value + "," : value;
          });

        output = values.join(this.rowDelimiter);

        return output;
      }
    },

    methods: {
    },
    mounted: function() {
    }
  });
})();
