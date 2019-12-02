<template>
    <div class="tab-details">
        <div class="layout-col" v-if="user">
            <DescriptionList title="User Data" class="tab-details-section border-none">
                <DescriptionListRow v-if="user.email" label="Email">{{
                    user.email
                }}</DescriptionListRow>
                <DescriptionListRow label="User data"
                    ><code class="code-inline"
                        ><pre>{{ stringifiedUserData }}</pre></code
                    ></DescriptionListRow
                >
            </DescriptionList>

            <DescriptionList v-if="request" title="Client info" class="tab-details-section">
                <DescriptionListRow label="IP address">{{ request.ip }}</DescriptionListRow>
                <DescriptionListRow label="User agent">{{ request.useragent }}</DescriptionListRow>
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
    name: 'UserTab',

    components: {
        DescriptionListRow,
        DescriptionList,
        EmptyMessage,
    },

    inject: ['error'],

    computed: {
        user() {
            return this.error.context.user;
        },

        request() {
            return this.error.context.request;
        },

        stringifiedUserData() {
            return JSON.stringify(this.user, null, 4);
        },
    },
};
</script>
