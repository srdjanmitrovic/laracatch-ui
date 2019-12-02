<template>
    <div>
        <DescriptionList title="Breadcrumbs">
            <DescriptionListRow label="Message">
                {{ event.label }}
            </DescriptionListRow>
            <DescriptionListRow label="Level">
                {{ event.metadata.log_level }}
            </DescriptionListRow>
            <DescriptionListRow v-for="(value, key) in event.context" :key="key" :label="key"
                ><code class="code-block"><pre v-html="value"></pre></code
            ></DescriptionListRow>
        </DescriptionList>
    </div>
</template>

<script>
import DescriptionList from '../../components/DescriptionList';
import DescriptionListRow from '../../components/DescriptionListRow.js';

export default {
    components: {
        DescriptionListRow,
        DescriptionList,
    },

    props: ['event'],
};
</script>
