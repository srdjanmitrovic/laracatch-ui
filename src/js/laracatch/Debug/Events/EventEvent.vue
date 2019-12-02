<template>
    <div>
        <DescriptionList title="Events">
            <DescriptionListRow label="Name">
                <code class="code-block mb-3" v-html="event.label"></code>
            </DescriptionListRow>
            <DescriptionListRow label="Params">
                <details class="border-l-2 border-gray-300 p-2 hover:border-red-500">
                    <summary class="cursor-pointer">Details</summary>
                    <code class="code-block mb-3"
                        ><pre v-html="JSON.stringify(event.metadata.params, null, 2)"></pre
                    ></code>
                </details>

            </DescriptionListRow>
            <DescriptionListRow label="Listeners">
                <details class="border-l-2 border-gray-300 p-2 hover:border-red-500">
                    <summary class="cursor-pointer">Details</summary>
                    <code class="code-block mb-3"
                        ><pre v-html="JSON.stringify(event.metadata.listeners, null, 2)"></pre
                    ></code>
                </details>
            </DescriptionListRow>
        </DescriptionList>
    </div>
</template>

<script>
import DescriptionList from '../../components/DescriptionList';
import DescriptionListRow from '../../components/DescriptionListRow.js';

export default {
    name: 'EventEvent',

    components: {
        DescriptionListRow,
        DescriptionList,
    },

    props: ['event'],
};
</script>
