<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" sm="12" md="6">
                <v-card-title class="justify-center h5">Playground</v-card-title>
                <v-card class="bg-accent mb-5 pa-2 mx-5 rounded-lg" elevation="0">
                    <v-sheet class="mx-3 bg-transparent" max-width="700">
                        <v-slide-group multiple show-arrows>
                            <v-slide-group-item v-for="(item, index) in templates" :key="index" v-slot="{ isSelected, toggle }">
                                <v-btn
                                    class="mx-2"
                                    :class="isSelected ? 'bg-purple text-white' : ''"
                                    variant="flat"
                                    rounded
                                    :size="display.xs.value ? 'small' : 'default'"
                                    @click="() => { formData = item.code; toggle(); }"
                                >
                                    {{ item.title }}
                                </v-btn>
                            </v-slide-group-item>
                        </v-slide-group>
                    </v-sheet>
                </v-card>
                <form-builder
                    class="mt-3"
                    @addField="addTextField()"
                    @removeField="removeTextField"
                    :form="formData" />
            </v-col>
            <v-divider vertical v-if="!display.xs.value" />
            <v-col cols="12" sm="12" md="6">
                <v-divider class="mt-5" v-if="display.xs.value" />
                <v-card-title class="justify-center h5" id="codeSection">Code</v-card-title>
                <code-block :code="formData" />
            </v-col>
        </v-row>
        <v-btn
            v-show="display.xs.value"
            icon="mdi-code-json"
            color="green"
            elevation="20"
            location="bottom right"
            position="fixed"
            @click="navigateToCode()"
        >
        </v-btn>
    </v-container>
</template>
<script>
import { useDisplay } from 'vuetify'
import formBuilder from '../components/form/formBuilder.vue'
import codeBlock from '@/components/code/codeBlock.vue'
import { signupForm, signin, signUp2, contactUs, sales, blank } from '@/resources/templateCodes'

export default {
    name: 'dashboard-component',
    setup() {
        const display = useDisplay()
        return { display }
    },
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
        this.addTextField()
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
            })
        },
        removeTextField: function (index) {
            this.formData.splice(index, 1)
        },
        navigateToCode: function () {
            const position = document.getElementById('codeSection').offsetTop
            window.scrollTo({ top: position, behavior: 'smooth' })
        },
    },
}
</script>
