<template>
    <div class="tab-details">
        <div
            class="sticky top-0 z-10 grid cols-auto items-center justify-center px-6 py-2 bg-gray-100 border-b border-tint-200 text-xs"
        >
            <nav class="grid cols-auto items-center gapx-6 gapy-2">
                <CheckboxField
                    label="Dumps"
                    :value="visibleTypes.dump && dumps.length"
                    @input="e => (visibleTypes.dump = e)"
                    name="show_dumps"
                    :disabled="!dumps.length"
                />

                <CheckboxField
                    label="Breadcrumbs"
                    :value="visibleTypes.breadcrumb && breadcrumbs.length"
                    @input="e => (visibleTypes.breadcrumb = e)"
                    name="show_breadcrumbs"
                    :disabled="!breadcrumbs.length"
                />

                <CheckboxField
                    label="Logs"
                    :value="visibleTypes.log && logs.length"
                    @input="e => (visibleTypes.log = e)"
                    name="show_logs"
                    :disabled="!logs.length"
                />

                <CheckboxField
                    label="Events"
                    :value="visibleTypes.event && events.length"
                    @input="e => (visibleTypes.event = e)"
                    name="show_events"
                    :disabled="!events.length"
                />

                <button
                    v-if="hasFilteredVisibleTypes"
                    @click="resetVisibleTypes"
                    class="font-normal text-tint-600 hover:text-tint-700 no-underline absolute left-full ml-6 hidden | sm:block"
                >
                    Reset&nbsp;filters
                </button>
            </nav>
        </div>

        <div class="layout-col">
            <DebugEvent
                v-for="event in visibleTimelineEvents"
                :key="event.microtime"
                v-bind="{ event }"
            ></DebugEvent>
        </div>

        <EmptyMessage v-if="visibleTimelineEvents.length === 0" class="place-center" />
    </div>
</template>

<script>
import Event from '../Debug/Event';
import DebugEvent from '../Debug/DebugEvent.vue';
import CheckboxField from '../../shared/CheckboxField';
import EmptyMessage from '../components/EmptyMessage.js';
import { mapValues, sortBy } from 'lodash';

export default {
    name: 'DebugTab',

    inject: ['error'],

    components: {
        CheckboxField,
        DebugEvent,
        EmptyMessage,
    },

    props: {
        dump: {
            type: Boolean,
            required: false,
            default: true
        },
        log: {
            type: Boolean,
            required: false,
            default: true
        },
        breadcrumb: {
            type: Boolean,
            required: false,
            default: true
        },
        event: {
            type: Boolean,
            required: false,
            default: true
        },
    },

    data() {
        return {
            visibleTypes: {
                dump: this.dump,
                log: this.log,
                breadcrumb: this.breadcrumb,
                event: this.event,
            },
        };
    },

    computed: {
        dumps() {
            return this.error.context.dumps || [];
        },
        logs() {
            return this.error.context.logs || [];
        },
        breadcrumbs() {
            return this.error.breadcrumbs || [];
        },
        events() {
            return this.error.context.events || [];
        },
        timelineEvents() {
            return sortBy(
                [
                    ...this.dumps.map(dump => Event.forDump(dump)),
                    ...this.logs.map(log => Event.forLog(log)),
                    ...this.breadcrumbs.map(breadcrumb => Event.forBreadcrumb(breadcrumb)),
                    ...this.events.map(event => Event.forEvent(event)),
                ],
                e => e.microtime,
            );
        },
        visibleTimelineEvents() {
            return this.timelineEvents.filter(e => {
                return this.visibleTypes[e.type];
            });
        },
        hasFilteredVisibleTypes() {
            let visibleCount = Object.values(this.visibleTypes).filter(type => type).length;
            let totalCount = Object.values(this.visibleTypes).length;

            return visibleCount !== totalCount;
        },
    },

    methods: {
        resetVisibleTypes() {
            this.visibleTypes = mapValues(this.visibleTypes, () => true);
        },
    },
};
</script>
