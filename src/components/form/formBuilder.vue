<template>
  <div>
    <v-card
      class="accent mb-5 pa-0 mx-5 rounded-lg"
      v-for="(textfield, index) in form"
      :key="index"
    >
      <v-card-text
        ><v-layout row wrap>
          <v-flex xs8 sm8 md8 class="mb-n4"
            ><v-text-field
              rounded
              v-model="textfield.title"
              solo
              class="ma-2"
            ></v-text-field></v-flex
          ><v-flex xs4 sm4 md4 class="mb-n4"
            ><v-select
              rounded
              v-model="textfield.type"
              :items="items"
              solo
              item-text="title"
              class="ma-2"
            ></v-select></v-flex></v-layout></v-card-text
    ></v-card>
    <v-layout justify-end class="mr-5">
      <v-btn
        rounded
        color="accent"
        @click.stop="$emit('addField')"
        :class="!$vuetify.theme.dark ? 'white--text' : 'black--text'"
      >
        <v-icon size="25px" class="mr-2">mdi-plus-circle</v-icon>Add text field
      </v-btn></v-layout
    >
  </div>
</template>

<script>
export default {
  components: {},
  props: { form: Array },
  data: () => ({
    items: [
      { title: "Number" },
      { title: "Text" },
      { title: "Password" },
      { title: "E-Mail" },
      { title: "Date" },
    ],
  }),
  methods: {},
};
</script>
<style></style>
