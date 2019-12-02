<template>
    <div :class="{ 'container-fluid py-8 xl:px-32': !embedded }">
        <div class="flex flex-wrap">
            <div class="w-full xl:mb-0 xl:w-3/4" :class="{ 'px-4 xl:px-6': !embedded }">
                <div class="xl:hidden">
                    <Actions />
                </div>

                <ExceptionCard />

                <div class="bg-white border border-gray-300 rounded-t-lg text-sm sticky top-0 z-30">
                    <div class="flex items-center px-8 py-6">
                        <Logo class="mr-8" />

                        <div class="text-gray-500 font-light w-full overflow-hidden">
                            <Tabs v-model="tab" v-bind="{ customTabs }" />
                        </div>
                    </div>
                </div>
                <div class="border border-t-0 border-tint-300">
                    <TabDetails v-bind="{ tab }" />
                </div>
            </div>
            <div class="w-full px-4 xl:w-1/4 xl:px-6 mt-8 xl:mt-0">
                <div class="hidden xl:block">
                    <Actions />
                </div>

                <div class="bg-white border border-gray-300 rounded-lg">
                    <SummaryCard />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Actions from './Actions';
import ExceptionCard from './ExceptionCard';
import Logo from '../shared/Logo';
import SummaryCard from './Summary/SummaryCard';
import TabDetails from './TabDetails';
import Tabs from './Tabs';

export default {
    props: {
        error: {
            required: true,
        },
        config: {
            required: true,
        },
        customTabs: {
            required: true,
        },
        solutions: {
            required: true,
        },
        telescopeUrl: {
            required: true,
        },
        shareEndpoint: {
            required: true,
        },
        defaultTab: {
            required: true,
        },
        defaultProps: {
            required: true,
        },
        embedded: {
            type: Boolean,
            required: false,
            default: false,
        },
    },

    data() {
        return {
            tab: {
                component: this.defaultTab,
                props: this.defaultProps
            },
        };
    },

    provide() {
        return {
            config: this.config,
            error: this.error,
            customTabs: this.customTabs,
            solutions: this.solutions,
            telescopeUrl: this.telescopeUrl,
            shareEndpoint: this.shareEndpoint,
        };
    },

    components: {
        Actions,
        ExceptionCard,
        Logo,
        SummaryCard,
        TabDetails,
        Tabs,
    },
};
</script>
