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

    data: {
      input: "",
      outputDelimiter: "\n",
      drawer: false
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

        output = values.join(this.outputDelimiter);

        return output;
      }
    },

    methods: {
    },
    mounted: function() {
    }
  });
})();
