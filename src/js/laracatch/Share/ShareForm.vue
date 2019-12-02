<template>
    <div>
        <div class="grid cols-2 justify-start gapx-6 gapy-2">
            <CheckboxField
                :key="tab.name"
                v-for="tab in tabs"
                :label="tab.label"
                :name="tab.name"
                v-model="tab.checked"
                :icon="tab.icon"
                class="text-gray-600 text-sm hover:text-red-400"
            />
        </div>

        <div class="mt-6">
            <div class="mb-3" v-if="error">
                We were unable to share your error.<br />
                Please try again later.
            </div>

            <button
                v-html="text"
                :disabled="loading"
                @click="shareError"
                class="bg-red-500 px-4 py-2 text-white font-bold uppercase tracking-wide text-xs rounded-full focus:shadow-outline"
            ></button>
        </div>
    </div>
</template>

<script>
import CheckboxField from '../../shared/CheckboxField';

export default {
    name: 'ShareForm',

    components: { CheckboxField },

    props: {
        error: {
            required: false,
        },
        loading: {
            type: Boolean,
            required: true,
        },
    },

    computed: {
        text() {
            return this.loading ? '<i class="fas fa-spinner fa-spin"></i>' : 'Share';
        },
        selectedTabs() {
            return this.tabs.filter(tab => tab.checked).map(tab => tab.name);
        },
    },

    data() {
        return {
            tabs: [
                { label: 'Stack trace', name: 'stackTraceTab', checked: true },
                { label: 'Request', name: 'requestTab', checked: true },
                { label: 'App', name: 'appTab', checked: true },
                { label: 'User', name: 'userTab', checked: true },
                { label: 'Queries', name: 'queryTab', checked: true },
                { label: 'Context', name: 'contextTab', checked: true },
                { label: 'Debug', name: 'debugTab', icon: 'fa-exclamation-triangle', checked: false },
            ],
        };
    },

    methods: {
        shareError() {
            if (! this.selectedTabs.length) {
                alert('Please select at least one tab to share');

                return;
            }

            this.$emit('share', this.selectedTabs);
        },
    },

    watch: {
        tabs: {
            handler: function(old, newVal) {
                if (newVal.find(tab => tab.name === 'debugTab').checked === true) {
                    alert(
                        'The Debug tab is not meant to be shared. Be careful because it may contain personal and sensitive data.',
                    );
                }
            },
            deep: true,
        },
    },
};
</script>
