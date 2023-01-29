<template>
  <div>
    <v-textarea
      background-color="grey"
      readonly
      auto-grow
      solo
      :value="fullCode"
      class="rounded-xl mx-5"
    ></v-textarea>
  </div>
</template>

<script>
import { template, script, methods, data } from "../../resources/baseCode";
export default {
  components: {},
  props: { code: Array },
  data: () => ({}),
  computed: {
    fullCode() {
      return (
        template[0] +
        this.code +
        template[1] +
        script[0] +
        data[0] +
        data[1] +
        methods +
        script[1]
      );
    },
  },
};
</script>
<style></style>
