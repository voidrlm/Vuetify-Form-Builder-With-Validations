<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 sm12 md6>
                <v-card-title class="justify-center h5">Playground</v-card-title>
                <v-card class="accent mb-5 pa-2 mx-5 rounded-lg" elevation="0">
                    <v-sheet class="mx-3 transparent" max-width="700">
                        <v-slide-group multiple show-arrows>
                            <v-slide-item v-for="(item, index) in templates" :key="index" v-slot="{ active }">
                                <v-btn
                                    class="mx-2"
                                    :input-value="active"
                                    active-class="purple white--text"
                                    depressed
                                    rounded
                                    :small="$vuetify.breakpoint.xsOnly"
                                    @click="formData = item.code"
                                >
                                    {{ item.title }}
                                </v-btn>
                            </v-slide-item>
                        </v-slide-group>
                    </v-sheet>
                </v-card>
                <form-builder
                    class="mt-3"
                    @addField="addTextField()"
                    @removeField="removeTextField"
                    :form="formData" /></v-flex
            ><v-divider vertical v-if="!$vuetify.breakpoint.xsOnly" />
            <v-flex xs12 sm12 md6>
                <v-divider class="mt-5" v-if="$vuetify.breakpoint.xsOnly" />
                <v-card-title class="justify-center h5" id="codeSection">Code</v-card-title>

                <!-- Code Generation Settings Panel -->
                <v-card class="accent mb-4 pa-3 mx-5 rounded-lg" elevation="0">
                    <v-row dense align="center" class="mx-1">
                        <!-- Vuetify Version Selector -->
                        <v-col cols="12" sm="4">
                            <div class="caption mb-1 text-center">Vuetify Version</div>
                            <v-btn-toggle
                                v-model="vuetifyVersion"
                                mandatory
                                dense
                                rounded
                                class="d-flex justify-center"
                            >
                                <v-btn :value="2" small>V2</v-btn>
                                <v-btn :value="3" small>V3</v-btn>
                                <v-btn :value="4" small>V4</v-btn>
                            </v-btn-toggle>
                        </v-col>

                        <!-- API Style Selector (only for v3/v4) -->
                        <v-col cols="12" sm="4">
                            <div class="caption mb-1 text-center">API Style</div>
                            <v-btn-toggle
                                v-model="apiStyle"
                                mandatory
                                dense
                                rounded
                                class="d-flex justify-center"
                                :disabled="vuetifyVersion === 2"
                            >
                                <v-btn value="options" small :disabled="vuetifyVersion === 2">Options</v-btn>
                                <v-btn value="composition" small :disabled="vuetifyVersion === 2">Composition</v-btn>
                            </v-btn-toggle>
                        </v-col>

                        <!-- TypeScript Toggle -->
                        <v-col cols="12" sm="4">
                            <div class="caption mb-1 text-center">Language</div>
                            <v-btn-toggle
                                v-model="useTypeScript"
                                mandatory
                                dense
                                rounded
                                class="d-flex justify-center"
                            >
                                <v-btn :value="false" small>JavaScript</v-btn>
                                <v-btn :value="true" small>TypeScript</v-btn>
                            </v-btn-toggle>
                        </v-col>
                    </v-row>
                </v-card>

                <code-block
                    :code="formData"
                    :vuetify-version="vuetifyVersion"
                    :api-style="apiStyle"
                    :use-type-script="useTypeScript"
                /></v-flex
        ></v-layout>
        <v-btn
            v-show="$vuetify.breakpoint.xsOnly"
            fab
            color="green"
            elevation="20"
            bottom
            right
            fixed
            @click="navigateToCode()"
        >
            <v-icon>mdi-code-json</v-icon>
        </v-btn>
    </v-container>
</template>
<script>
import formBuilder from '../components/form/formBuilder.vue';
import codeBlock from '@/components/code/codeBlock.vue';
import { signupForm, signin, signUp2, contactUs, sales, blank } from '@/resources/templateCodes';
export default {
    name: 'dashboard-component',
    data: () => ({
        formData: [],
        model: null,
        vuetifyVersion: 2,
        apiStyle: 'options',
        useTypeScript: false,
        templates: [
            { title: 'Blank', code: blank },
            { title: 'Sign-up', code: signupForm },
            { title: 'Sign-In', code: signin },
            { title: 'Sign-up 2', code: signUp2 },
            { title: 'Contact Us', code: contactUs },
            { title: 'Sales', code: sales },
        ],
    }),
    components: {
        formBuilder,
        codeBlock,
    },
    computed: {},
    watch: {
        vuetifyVersion(newVal) {
            // Reset to options API if switching to Vuetify 2
            if (newVal === 2) {
                this.apiStyle = 'options';
            }
        },
    },
    mounted() {
        this.addTextField();
    },

    methods: {
        addTextField: function () {
            this.formData.push({
                title: '',
                type: 'Number',
                required: false,
                outlined: false,
                dense: false,
                rounded: false,
                minCurrentDay: false,
                max: 0,
                showPassOnField: false,
                showDollarPrefix: false,
                // New field properties
                rows: 3,
                autoGrow: false,
                items: [],
                multiple: false,
                chips: false,
                radioItems: [],
                inline: false,
                inset: false,
                color: '',
            });
        },
        removeTextField: function (index) {
            this.formData.splice(index, 1);
        },
        navigateToCode: function () {
            const position = document.getElementById('codeSection').offsetTop;
            window.scrollTo({ top: position, behavior: 'smooth' });
        },
    },
};
</script>
