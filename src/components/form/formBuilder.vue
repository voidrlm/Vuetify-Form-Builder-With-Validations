<template>
  <div>
    <v-card
      class="accent mb-5 pa-0 mx-5 rounded-lg"
      elevation="0"
      v-for="(textfield, index) in form"
      :key="index"
    >
      <v-card-text
        ><v-layout row wrap class="mb-n5">
          <v-flex xs8 sm8 md8
            ><v-text-field
              rounded
              v-model="textfield.title"
              label="Label"
              solo
              class="ma-2"
              flat
            ></v-text-field></v-flex
          ><v-flex xs4 sm4 md4
            ><v-select
              rounded
              v-model="textfield.type"
              :items="items"
              solo
              item-text="title"
              class="ma-2"
              flat
            ></v-select></v-flex
        ></v-layout>

        <v-layout row class="mt-n8">
          <v-checkbox
            v-model="textfield.outlined"
            label="Outlined"
            class="mx-3"
            color="accent darken-2"
          ></v-checkbox>

          <v-checkbox
            v-model="textfield.dense"
            label="Dense"
            color="accent darken-2"
          ></v-checkbox>
          <v-spacer />

          <v-switch
            v-model="textfield.required"
            class="font-weight-medium mr-5"
            inset
            :class="!$vuetify.theme.dark ? 'white--text' : 'black--text'"
            :color="$vuetify.theme.dark ? 'black' : 'white'"
            :label="'Required'"
          ></v-switch
        ></v-layout>
        <v-layout row class="mx-1">
          <v-slider
            :disabled="
              textfield.type == 'E-Mail' ||
              textfield.type == 'Date' ||
              textfield.type == 'Number' ||
              textfield.type == 'Password'
            "
            thumb-label
            v-model="textfield.max"
            class=""
            color="accent darken-2"
            label="Max characters"
          >
          </v-slider></v-layout></v-card-text
    ></v-card>
    <v-layout justify-end class="mr-5">
      <v-btn
        elevation="0"
        rounded
        color="accent"
        @click.stop="$emit('addField')"
        :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
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
