<template>
    <div>
        <DescriptionList title="Query">
            <DescriptionListRow>
                <template v-slot:label>
                    <span>{{ event.metadata.connection_name }}</span
                    ><br />
                    <span>({{ event.metadata.time }} {{ event.metadata.measure_unit }})</span>
                </template>
                <code class="code-block"><pre v-html="formatQuery(event.label)"></pre></code>
            </DescriptionListRow>
            <DescriptionListRow v-for="(value, key) in event.context" :key="key" :label="key">
                {{ value }}
            </DescriptionListRow>
        </DescriptionList>
    </div>
</template>

<script>
import sqlFormatter from 'sql-formatter';
import DescriptionList from '../../components/DescriptionList';
import DescriptionListRow from '../../components/DescriptionListRow.js';

export default {
    components: {
        DescriptionListRow,
        DescriptionList,
    },

    props: ['event'],

    methods: {
        formatQuery(query) {
            return sqlFormatter.format(query);
        },
    },
};
</script>
