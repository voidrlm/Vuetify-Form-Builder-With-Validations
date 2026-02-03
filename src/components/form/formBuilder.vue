<template>
    <div>
        <v-card class="accent mb-5 pa-0 mx-5 rounded-xl" elevation="0" v-for="(textfield, index) in form" :key="index">
            <v-card-text
                ><v-row wrap>
                    <v-flex xs12 sm8 md8
                        ><v-text-field
                            rounded
                            v-model="textfield.title"
                            label="Label"
                            solo
                            class="mx-2 mt-2"
                            :class="$vuetify.breakpoint.xsOnly ? 'mb-n2' : ''"
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
                            class="mx-2 mt-2"
                            :class="$vuetify.breakpoint.xsOnly ? 'mb-n2' : ''"
                            flat
                            hint="Field Type"
                        ></v-select></v-flex
                ></v-row>

                <v-row wrap class="justify-center align-center" :class="$vuetify.breakpoint.xsOnly ? 'my-n2' : 'my-n5'">
                    <v-col :cols="$vuetify.breakpoint.xsOnly ? 12 : $vuetify.breakpoint.mdOnly ? 8 : 9">
                        <v-slider
                            v-if="showMaxSlider(textfield.type)"
                            thumb-label
                            v-model="textfield.max"
                            class="mr-5 ml-2"
                            color="primary"
                            :max="textfield.type === 'Number' ? 25 : 500"
                            label="Max characters"
                        >
                        </v-slider>
                        <!-- Textarea rows slider -->
                        <v-slider
                            v-else-if="textfield.type === 'Textarea'"
                            thumb-label
                            v-model="textfield.rows"
                            class="mr-5 ml-2"
                            color="primary"
                            :min="1"
                            :max="20"
                            label="Rows"
                        >
                        </v-slider>
                    </v-col>
                    <v-col :cols="$vuetify.breakpoint.xsOnly ? 12 : $vuetify.breakpoint.mdOnly ? 4 : 3">
                        <v-layout
                            class=""
                            :class="$vuetify.breakpoint.xsOnly ? 'ma-n5 mt-n10 justify-center' : 'mt-n5'"
                        >
                            <v-switch
                                v-model="textfield.required"
                                class="font-weight-medium"
                                inset
                                :class="!$vuetify.theme.dark ? 'white--text' : 'black--text'"
                                :color="$vuetify.theme.dark ? 'primary lighten-1' : 'primary darken-1'"
                                :label="'Required'"
                            ></v-switch></v-layout></v-col></v-row>

                <!-- Select field items configuration -->
                <v-row v-if="textfield.type === 'Select'" class="mx-2 my-n3">
                    <v-col cols="12">
                        <v-combobox
                            v-model="textfield.items"
                            label="Select Options (press Enter to add)"
                            multiple
                            chips
                            small-chips
                            deletable-chips
                            outlined
                            dense
                            class="rounded-lg"
                            hint="Type an option and press Enter"
                        ></v-combobox>
                    </v-col>
                </v-row>

                <!-- Radio field items configuration -->
                <v-row v-if="textfield.type === 'Radio'" class="mx-2 my-n3">
                    <v-col cols="12">
                        <v-combobox
                            v-model="textfield.radioItems"
                            label="Radio Options (press Enter to add)"
                            multiple
                            chips
                            small-chips
                            deletable-chips
                            outlined
                            dense
                            class="rounded-lg"
                            hint="Type an option and press Enter"
                        ></v-combobox>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
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
                <!-- Textarea auto-grow toggle -->
                <v-tooltip bottom v-if="textfield.type === 'Textarea'">
                    <template v-slot:activator="{ on, attrs }">
                        <v-chip
                            class="ma-2 font-weight-bold"
                            :class="textfield.autoGrow ? 'success--text' : ''"
                            outlined
                            v-bind="attrs"
                            v-on="on"
                            pill
                            @click="textfield.autoGrow = !textfield.autoGrow"
                        >
                            Auto Grow
                        </v-chip>
                    </template>
                    <span>Textarea expands as you type</span>
                </v-tooltip>
                <!-- Select multiple toggle -->
                <v-tooltip bottom v-if="textfield.type === 'Select'">
                    <template v-slot:activator="{ on, attrs }">
                        <v-chip
                            class="ma-2 font-weight-bold"
                            :class="textfield.multiple ? 'success--text' : ''"
                            outlined
                            v-bind="attrs"
                            v-on="on"
                            pill
                            @click="textfield.multiple = !textfield.multiple"
                        >
                            Multiple
                        </v-chip>
                    </template>
                    <span>Allow multiple selections</span>
                </v-tooltip>
                <!-- Select chips toggle -->
                <v-tooltip bottom v-if="textfield.type === 'Select'">
                    <template v-slot:activator="{ on, attrs }">
                        <v-chip
                            class="ma-2 font-weight-bold"
                            :class="textfield.chips ? 'success--text' : ''"
                            outlined
                            v-bind="attrs"
                            v-on="on"
                            pill
                            @click="textfield.chips = !textfield.chips"
                        >
                            Chips
                        </v-chip>
                    </template>
                    <span>Display selections as chips</span>
                </v-tooltip>
                <!-- Radio inline toggle -->
                <v-tooltip bottom v-if="textfield.type === 'Radio'">
                    <template v-slot:activator="{ on, attrs }">
                        <v-chip
                            class="ma-2 font-weight-bold"
                            :class="textfield.inline ? 'success--text' : ''"
                            outlined
                            v-bind="attrs"
                            v-on="on"
                            pill
                            @click="textfield.inline = !textfield.inline"
                        >
                            Inline
                        </v-chip>
                    </template>
                    <span>Display radio buttons in a row</span>
                </v-tooltip>
                <!-- Switch inset toggle -->
                <v-tooltip bottom v-if="textfield.type === 'Switch'">
                    <template v-slot:activator="{ on, attrs }">
                        <v-chip
                            class="ma-2 font-weight-bold"
                            :class="textfield.inset ? 'success--text' : ''"
                            outlined
                            v-bind="attrs"
                            v-on="on"
                            pill
                            @click="textfield.inset = !textfield.inset"
                        >
                            Inset
                        </v-chip>
                    </template>
                    <span>Use inset style for switch</span>
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
                    v-if="showOutlinedOption(textfield.type)"
                    class="ma-2 font-weight-bold"
                    :class="textfield.outlined ? 'success--text' : ''"
                    outlined
                    pill
                    @click="textfield.outlined = !textfield.outlined"
                >
                    Outlined
                </v-chip>
                <v-chip
                    v-if="showRoundedOption(textfield.type)"
                    class="ma-2 font-weight-bold"
                    :class="textfield.rounded ? 'success--text' : ''"
                    outlined
                    pill
                    @click="textfield.rounded = !textfield.rounded"
                >
                    Rounded </v-chip
                ><v-spacer></v-spacer>
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
                <v-icon size="25px" class="mr-2">mdi-plus-circle</v-icon>Add field
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
            { title: 'Number' },
            { title: 'Text' },
            { title: 'Password' },
            { title: 'E-Mail' },
            { title: 'Date' },
            { title: 'Checkbox' },
            { title: 'Textarea' },
            { title: 'Select' },
            { title: 'Radio' },
            { title: 'Switch' },
        ],
    }),
    methods: {
        showMaxSlider(type) {
            return type === 'Text' || type === 'Number' || type === 'Textarea';
        },
        showOutlinedOption(type) {
            return !['Checkbox', 'Radio', 'Switch'].includes(type);
        },
        showRoundedOption(type) {
            return !['Checkbox', 'Radio', 'Switch'].includes(type);
        },
    },
};
</script>
<style></style>
