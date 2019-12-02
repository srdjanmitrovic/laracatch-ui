<template>
    <div class="tab-details">
        <div class="layout-col" v-if="request">
            <DescriptionList title="Request" class="tab-details-section border-none">
                <DescriptionListRow label="URL">{{ request.url }}</DescriptionListRow>
                <DescriptionListRow label="Method">{{ request.method }}</DescriptionListRow>
            </DescriptionList>

            <DescriptionList title="Headers" class="tab-details-section">
                <DescriptionListRow
                    v-for="(key, value, index) in headers"
                    :key="index"
                    :label="value"
                    >{{ key[0] }}</DescriptionListRow
                >
            </DescriptionList>

            <DescriptionList title="Query String" class="tab-details-section">
                <DescriptionListRow
                    v-for="(key, value) in requestData.queryString"
                    :key="key"
                    :label="value"
                    >{{ key }}</DescriptionListRow
                >
            </DescriptionList>

            <DescriptionList title="Body" class="tab-details-section">
                <DescriptionListRow
                    v-for="(key, value) in requestData.body"
                    :key="key"
                    :label="value"
                    >{{ key }}</DescriptionListRow
                >
            </DescriptionList>

            <DescriptionList title="Files" class="tab-details-section">
                <DescriptionListRow
                    v-for="(key, value) in requestData.files"
                    :key="key"
                    :label="value"
                    >{{ key }}</DescriptionListRow
                >
            </DescriptionList>

            <DescriptionList title="Session" class="tab-details-section">
                <DescriptionListRow
                    v-for="(key, value, index) in session"
                    :key="index"
                    :label="value"
                >
                    <template v-if="typeof key === 'string'">
                        {{ key }}
                    </template>
                    <code v-else class="code-inline">
                        <pre>{{ key }}</pre>
                    </code>
                </DescriptionListRow>
            </DescriptionList>

            <DescriptionList title="Cookies" class="tab-details-section">
                <DescriptionListRow v-for="(key, value) in cookies" :key="key" :label="value">{{
                    key
                }}</DescriptionListRow>
            </DescriptionList>
        </div>
        <div class="layout-col" v-else>
            <EmptyMessage />
        </div>
    </div>
</template>

<script>
import DescriptionList from '../components/DescriptionList';
import DescriptionListRow from '../components/DescriptionListRow.js';
import EmptyMessage from '../components/EmptyMessage.js';

export default {
    name: 'RequestTab',

    components: {
        DescriptionListRow,
        DescriptionList,
        EmptyMessage,
    },

    inject: ['error'],

    computed: {
        request() {
            return this.error.context.request;
        },

        requestData() {
            return this.error.context.request_data;
        },

        headers() {
            return this.error.context.headers;
        },

        session() {
            return this.error.context.session;
        },

        cookies() {
            return this.error.context.cookies;
        },
    },
};
</script>
