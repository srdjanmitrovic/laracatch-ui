<template>
    <div class="tab-details">
        <div class="layout-col" v-if="route">
            <DescriptionList title="Routing" class="tab-details-section">
                <DescriptionListRow label="Controller">{{
                    route.controllerAction
                }}</DescriptionListRow>
                <DescriptionListRow label="Route name">
                    <template v-if="route.route">{{ route.route }}</template>
                    <i v-else>unknown</i>
                </DescriptionListRow>
                <DescriptionListRow label="Route parameters">
                    <DescriptionList>
                        <DescriptionListRow
                            v-for="(parameter, key) in route.routeParameters || []"
                            :label="key"
                            :key="key"
                            ><code class="code-inline"
                                ><pre>{{ parameter }}</pre></code
                            ></DescriptionListRow
                        >
                    </DescriptionList>
                </DescriptionListRow>
                <DescriptionListRow label="Middleware">
                    <DescriptionList>
                        <DescriptionListRow
                            v-for="(middleware, i) in route.middleware || []"
                            :key="i"
                            >{{ middleware }}</DescriptionListRow
                        >
                    </DescriptionList>
                </DescriptionListRow>
            </DescriptionList>

            <DescriptionList title="View" class="tab-details-section">
                <DescriptionListRow label="View name">{{ view.view }}</DescriptionListRow>
                <DescriptionListRow label="View data">
                    <DescriptionList>
                        <DescriptionListRow
                            v-for="(dump, key) in view.data || []"
                            :key="key"
                            :label="key"
                        >
                            <div v-html="dump"></div>
                        </DescriptionListRow>
                    </DescriptionList>
                </DescriptionListRow>
            </DescriptionList>
        </div>

        <EmptyMessage v-else />
    </div>
</template>

<script>
import DescriptionList from '../components/DescriptionList';
import DescriptionListRow from '../components/DescriptionListRow.js';
import EmptyMessage from '../components/EmptyMessage.js';

export default {
    name: 'AppTab',

    components: {
        DescriptionListRow,
        DescriptionList,
        EmptyMessage
    },

    inject: ['error'],

    computed: {
        route() {
            return this.error.context.route;
        },
        view() {
            return this.error.context.view || {};
        },
        viewData() {
            return Object.entries(this.view.data || []).map(([key, dump]) => ({ key, dump }));
        },
    },
};
</script>
