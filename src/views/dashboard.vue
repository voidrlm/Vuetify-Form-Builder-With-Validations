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
                <v-card-title class="justify-center h5" id="codeSection">Code</v-card-title
                ><code-block :code="formData" /></v-flex
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
