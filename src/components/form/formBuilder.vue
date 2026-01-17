<template>
    <div>
        <v-card class="bg-accent mb-5 pa-0 mx-5 rounded-xl" elevation="0" v-for="(textfield, index) in form" :key="index">
            <v-card-text
                ><v-row>
                    <v-col cols="12" sm="8" md="8"
                        ><v-text-field
                            rounded
                            v-model="textfield.title"
                            label="Label"
                            variant="solo"
                            class="mx-2 mt-2"
                            :class="display.xs.value ? 'mb-n2' : ''"
                            hint="Label"
                        ></v-text-field></v-col
                    ><v-col cols="12" sm="4" md="4"
                        ><v-select
                            rounded
                            v-model="textfield.type"
                            :items="items"
                            variant="solo"
                            item-title="title"
                            class="mx-2 mt-2"
                            :class="display.xs.value ? 'mb-n2' : ''"
                            hint="Field Type"
                        ></v-select></v-col
                ></v-row>

                <v-row class="justify-center align-center" :class="display.xs.value ? 'my-n2' : 'my-n5'">
                    <v-col :cols="display.xs.value ? 12 : display.md.value ? 8 : 9">
                        <v-slider
                            :disabled="textfield.type !== 'Text' && textfield.type !== 'Number'"
                            thumb-label
                            v-model="textfield.max"
                            class="mr-5 ml-2"
                            color="primary"
                            :max="textfield.type === 'Number' ? 25 : 500"
                            label="Max characters"
                        >
                        </v-slider
                    ></v-col>
                    <v-col :cols="display.xs.value ? 12 : display.md.value ? 4 : 3">
                        <div
                            class="d-flex"
                            :class="display.xs.value ? 'ma-n5 mt-n10 justify-center' : 'mt-n5'"
                        >
                            <v-switch
                                v-model="textfield.required"
                                class="font-weight-medium"
                                :class="!theme.global.current.value.dark ? 'text-white' : 'text-black'"
                                :color="theme.global.current.value.dark ? 'primary-lighten-1' : 'primary-darken-1'"
                                :label="'Required'"
                            ></v-switch></div></v-col></v-row
            ></v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-tooltip location="bottom" v-if="textfield.type === 'Number'">
                    <template v-slot:activator="{ props }">
                        <v-chip
                            class="ma-2 font-weight-bold"
                            :class="textfield.showDollarPrefix ? 'text-success' : ''"
                            variant="outlined"
                            v-bind="props"
                            @click="textfield.showDollarPrefix = !textfield.showDollarPrefix"
                        >
                            $
                        </v-chip>
                    </template>
                    <span>Adds a dollar prefix in textfield</span>
                </v-tooltip>
                <v-tooltip location="bottom" v-if="textfield.type === 'Date'">
                    <template v-slot:activator="{ props }">
                        <v-chip
                            class="ma-2 font-weight-bold"
                            :class="textfield.minCurrentDay ? 'text-success' : ''"
                            variant="outlined"
                            v-bind="props"
                            @click="textfield.minCurrentDay = !textfield.minCurrentDay"
                        >
                            Date Validation
                        </v-chip>
                    </template>
                    <span>Date input cannot be before current day</span>
                </v-tooltip>
                <v-chip
                    class="ma-2 font-weight-bold"
                    :class="textfield.dense ? 'text-success' : ''"
                    variant="outlined"
                    @click="textfield.dense = !textfield.dense"
                >
                    Dense
                </v-chip>
                <v-chip
                    v-if="textfield.type !== 'Checkbox'"
                    class="ma-2 font-weight-bold"
                    :class="textfield.outlined ? 'text-success' : ''"
                    variant="outlined"
                    @click="textfield.outlined = !textfield.outlined"
                >
                    Outlined
                </v-chip>
                <v-chip
                    v-if="textfield.type !== 'Checkbox'"
                    class="ma-2 font-weight-bold"
                    :class="textfield.rounded ? 'text-success' : ''"
                    variant="outlined"
                    @click="textfield.rounded = !textfield.rounded"
                >
                    Rounded </v-chip
                ><v-spacer></v-spacer>
                <v-divider vertical></v-divider>
                <v-btn
                    icon="mdi-delete"
                    class="text-red ml-2 mr-2"
                    @click.stop="$emit('removeField', index)"
                    :disabled="index === 0"
                >
                </v-btn>
            </v-card-actions></v-card
        >
        <div class="d-flex justify-end mr-5">
            <v-btn
                elevation="0"
                rounded
                color="accent"
                @click.stop="$emit('addField')"
                :class="theme.global.current.value.dark ? 'text-white' : 'text-black'"
            >
                <v-icon size="25px" class="mr-2">mdi-plus-circle</v-icon>Add text field
            </v-btn></div
        >
    </div>
</template>

<script>
import { useDisplay, useTheme } from 'vuetify'

export default {
    setup() {
        const display = useDisplay()
        const theme = useTheme()
        return { display, theme }
    },
    components: {},
    props: { form: Array },
    data: () => ({
        items: [
            { title: 'Number' },
            { title: 'Text' },
            { title: 'Password' },
            { title: 'E-Mail' },
            { title: 'Date' },
            { title: 'Checkbox' },
        ],
    }),
    methods: {},
}
</script>
<style></style>
