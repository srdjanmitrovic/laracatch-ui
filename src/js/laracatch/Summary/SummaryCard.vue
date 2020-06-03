<template>
    <div class="flex flex-wrap">
        <div v-if="error.context.framework" class="w-full">
            <SummaryItem
                title="Version"
                icon="fa-asterisk"
                class="border-b border-gray-300"
                :value="version"
            />
        </div>
        <div v-if="error.context.git && error.context.git.isInitialized" class="w-full">
            <SummaryItem
                title="Git Hash"
                icon="fa-code-branch"
                class="border-b border-gray-300"
                :value="error.context.git.hash"
            />
        </div>
        <div v-if="error.exception_class" class="w-full">
            <SummaryItem
                title="Exception Class"
                icon="fa-bug"
                class="border-b border-gray-300"
                :value="error.exception_class"
            />
        </div>
        <div class="w-full">
            <SummaryItem
                title="Class"
                icon="fa-file"
                class="border-b border-gray-300"
                :value="classString"
            />
        </div>
        <div v-if="error.context.route" class="w-full">
            <SummaryItem
                title="Route"
                icon="fa-route"
                class="border-b border-gray-300"
                :value="error.context.route.route || error.context.route.controllerAction"
            />
        </div>
        <div class="w-full" v-if="error.method">
            <SummaryItem
                title="Method"
                icon="fa-exchange-alt"
                class="border-b border-gray-300"
                :value="error.method"
            />
        </div>
        <div class="w-full" v-if="get(error, 'context.queries')">
            <SummaryItem
                title="Queries"
                icon="fa-database"
                class="border-b border-gray-300"
                :value="error.context.queries.length"
            />
        </div>
        <div class="w-full" v-if="get(error, 'performance.time')">
            <SummaryItem
                title="Time"
                icon="fa-clock"
                class="border-b border-gray-300"
                :value="error.performance.time.human_duration"
            />
        </div>
        <div class="w-full" v-if="get(error, 'performance.memory')">
            <SummaryItem
                title="Memory"
                icon="fa-memory"
                class="border-b border-gray-300"
                :value="error.performance.memory.human_peak_usage"
            />
        </div>
        <div class="w-full" v-if="error">
            <SummaryItem title="Environment" icon="fa-cloud" :value="error.environment" />
        </div>
    </div>
</template>

<script>
import SummaryItem from './SummaryItem';

export default {
    inject: ['error'],

    name: 'SummaryCard',

    components: {
        SummaryItem,
    },

    computed: {
        classString: function() {
            if (this.error.stacktrace[0].class) {
                const splitClassName = this.error.stacktrace[0].class.split('\\');

                return splitClassName[splitClassName.length - 1];
            }

            return this.error.stacktrace[0].file;
        },

        version: function() {
            const laravelVersion = this.error.context.framework.laravel_version;
            const phpVersion = this.error.context.framework.php_version;

            return `Laravel ${laravelVersion} (${phpVersion})`;
        },
    },
};
</script>
