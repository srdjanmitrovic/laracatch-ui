<template>
    <div>
        <DescriptionList title="Log">
            <DescriptionListRow label="Message"
                ><code class="code-block"
                    ><pre>{{ event.label }}</pre></code
                ></DescriptionListRow
            >
            <DescriptionListRow label="Level">
                {{ event.metadata.level }}
            </DescriptionListRow>
            <DescriptionListRow v-for="(value, key) in event.context" :key="key" :label="key">
                {{ value }}
            </DescriptionListRow>
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
