<template>
    <nav class="overflow-x-scroll md:overflow-auto">
        <ul class="inline-block pt-2 whitespace-no-wrap">
            <li
                v-for="tab in tabs"
                :key="tab.component"
                class="inline-block mr-8 lg:mr-12 hover:text-gray-800"
            >
                <button
                    class="pb-2 focus:shadow-outline"
                    :class="
                        value.component === tab.component
                            ? 'border-b-4 border-red-500 text-gray-800'
                            : ''
                    "
                    @click.prevent="$emit('input', tab)"
                    :title="tab.title"
                >
                    {{ tab.title }}
                </button>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Tabs',

    inject: ['config'],

    props: {
        value: { required: true },
        customTabs: { required: true },
    },

    data() {
        return {
            defaultTabs: [
                {
                    component: 'StackTab',
                    title: 'Stack Trace'
                },
                {
                    component: 'RequestTab',
                    title: 'Request'
                },
                {
                    component: 'AppTab',
                    title: 'App'
                },
                {
                    component: 'UserTab',
                    title: 'User'
                },
                {
                    component: 'QueryTab',
                    title: 'Queries'
                },
                {
                    component: 'ContextTab',
                    title: 'Context'
                },
                {
                    component: 'DebugTab',
                    title: 'Debug'
                },
            ]
        };
    },

    mounted() {
        this.$emit('input', this.tabs[this.currentTabIndex]);
    },

    computed: {
        currentTabIndex() {
            return this.tabs.findIndex(tab => tab.component === this.value.component);
        },

        nextTab() {
            return this.tabs[this.currentTabIndex + 1] || this.tabs[0];
        },

        previousTab() {
            return this.tabs[this.currentTabIndex - 1] || this.tabs[this.tabs.length - 1];
        },

        tabs() {
            let tabs = {};

            this.defaultTabs.forEach(tab => {
                if (tab.component === this.value.component) {
                    tab.props = this.value.props || {};
                }

                tabs[tab.component] = tab;
            });

            this.customTabs.forEach(tab => {
                tabs[tab.component] = tab;
            });

            return Object.values(tabs);
        },
    },

};
</script>
