<template>
    <v-card-text>
        <v-layout
            :justify-end="$vuetify.breakpoint.lgAndUp"
            :justify-center="$vuetify.breakpoint.smAndDown"
            class="mr-1 mb-5"
        >
            <codeRunner :code="getCodeToRun" />
            <v-btn
                elevation="0"
                rounded
                color="accent"
                @click="copyCode()"
                :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
            >
                <v-icon size="25px" class="mr-2">mdi-clipboard-outline</v-icon>Copy Code
            </v-btn>
        </v-layout>
        <v-card class="rounded-xl secondary">
            <pre
                ref="Syntax"
                class="CodeBackground font-weight-bold"
                style="padding: 20px; overflow: auto; border-radius: 10px"
                >{{ fullCode }}</pre
            >
        </v-card>
    </v-card-text>
</template>

<script>
import codeRunner from './codeRunner.vue';
import { generateCode } from '../../resources/codeGenerators';

export default {
    props: {
        code: Array,
        vuetifyVersion: {
            type: Number,
            default: 2,
        },
        apiStyle: {
            type: String,
            default: 'options',
        },
        useTypeScript: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({ dialog: false }),
    components: { codeRunner },
    computed: {
        getCodeToRun() {
            // Reset values for code runner preview
            return this.code.map((field) => ({
                ...field,
                value: '',
                showPassOnField: false,
            }));
        },
        fullCode() {
            // Use the new modular generator system
            return generateCode(this.code, {
                vuetifyVersion: this.vuetifyVersion,
                apiStyle: this.apiStyle,
                useTypeScript: this.useTypeScript,
            });
        },
    },
    methods: {
        copyCode() {
            navigator.clipboard.writeText(this.fullCode);
        },
        runCode() {
            console.log('Running code');
        },
    },
};
</script>
<style></style>
