<template>
  <div>
    <v-card
      class="accent mb-5 pa-0 mx-5 rounded-xl"
      elevation="0"
      v-for="(textfield, index) in form"
      :key="index"
    >
      <v-card-text
        ><v-layout row wrap class="mb-n5">
          <v-flex xs12 sm8 md8
            ><v-text-field
              rounded
              v-model="textfield.title"
              label="Label"
              solo
              class="ma-2"
              flat
              hint="Label"
            ></v-text-field></v-flex
          ><v-flex xs12 sm4 md4
            ><v-select
              rounded
              v-model="textfield.type"
              :items="items"
              solo
              item-text="title"
              class="ma-2"
              flat
              hint="Field Type"
            ></v-select></v-flex
        ></v-layout>

        <v-layout row class="mt-n8 justify-center align-center">
          <v-col :cols="$vuetify.breakpoint.xsOnly ? 12 : 10">
            <v-slider
              :disabled="
                textfield.type == 'E-Mail' ||
                textfield.type == 'Date' ||
                textfield.type == 'Number' ||
                textfield.type == 'Password'
              "
              thumb-label
              v-model="textfield.max"
              class="mt-4 mr-2"
              color="primary"
              :max="50"
              label="Max characters"
            >
            </v-slider
          ></v-col>
          <v-col :cols="$vuetify.breakpoint.xsOnly ? 12 : 2">
            <v-row align="center" justify="center">
              <v-switch
                v-model="textfield.required"
                class="font-weight-medium mr-10"
                inset
                :class="!$vuetify.theme.dark ? 'white--text' : 'black--text'"
                :color="
                  $vuetify.theme.dark ? 'primary lighten-1' : 'primary darken-1'
                "
                :label="'Required'"
              ></v-switch></v-row></v-col></v-layout
      ></v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-tooltip bottom v-if="textfield.type === 'Number'">
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              class="ma-2 font-weight-bold"
              :class="textfield.showDollarPrefix ? 'success--text' : ''"
              outlined
              v-bind="attrs"
              v-on="on"
              pill
              @click="textfield.showDollarPrefix = !textfield.showDollarPrefix"
            >
              $
            </v-chip>
          </template>
          <span>Adds a dollar prefix in textfield</span>
        </v-tooltip>
        <v-tooltip bottom v-if="textfield.type === 'Date'">
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              class="ma-2 font-weight-bold"
              :class="textfield.minCurrentDay ? 'success--text' : ''"
              outlined
              v-bind="attrs"
              v-on="on"
              pill
              @click="textfield.minCurrentDay = !textfield.minCurrentDay"
            >
              Date Validation
            </v-chip>
          </template>
          <span>Date input cannot be before current day</span>
        </v-tooltip>
        <v-chip
          class="ma-2 font-weight-bold"
          :class="textfield.dense ? 'success--text' : ''"
          outlined
          pill
          @click="textfield.dense = !textfield.dense"
        >
          Dense
        </v-chip>
        <v-chip
          class="ma-2 font-weight-bold"
          :class="textfield.outlined ? 'success--text' : ''"
          outlined
          pill
          @click="textfield.outlined = !textfield.outlined"
        >
          Outlined
        </v-chip>
        <v-chip
          class="ma-2 font-weight-bold"
          :class="textfield.rounded ? 'success--text' : ''"
          outlined
          pill
          @click="textfield.rounded = !textfield.rounded"
        >
          Rounded
        </v-chip>
        <v-divider vertical></v-divider>
        <v-btn
          icon
          class="red--text ml-2 mr-2"
          @click.stop="$emit('removeField', index)"
          :disabled="index === 0"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions></v-card
    >
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
