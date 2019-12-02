<template>
    <div class="tab-details">
        <div class="layout-col">
            <DebugEvent
                v-for="event in queries"
                :key="event.microtime"
                v-bind="{ event }"
            ></DebugEvent>
        </div>

        <EmptyMessage v-if="queries.length === 0" />
    </div>
</template>

<script>
import Event from '../Debug/Event';
import DebugEvent from '../Debug/DebugEvent.vue';
import EmptyMessage from '../components/EmptyMessage.js';

export default {
    name: 'QueryTab',

    inject: ['error'],

    components: { DebugEvent, EmptyMessage },

    computed: {
        queries() {
            return (this.error.context.queries || []).map(query => Event.forQuery(query));
        },
    },
};
</script>
