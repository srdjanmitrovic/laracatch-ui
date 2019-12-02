<template>
    <div>
        <DescriptionList title="Dump">
            <DescriptionListRow label="Content">
                <code class="code-block mb-3" v-html="event.label"></code>
            </DescriptionListRow>
            <DescriptionListRow label="Location">
                <FilePath
                    v-if="event.file"
                    :file="event.file"
                    :lineNumber="event.line_number"
                    :editable="true"
                ></FilePath>
            </DescriptionListRow>
        </DescriptionList>
    </div>
</template>

<script>
import FilePath from '../../components/FilePath';
import DescriptionList from '../../components/DescriptionList';
import DescriptionListRow from '../../components/DescriptionListRow.js';

export default {
    name: 'DumpEvent',

    components: {
        DescriptionListRow,
        DescriptionList,
        FilePath,
    },

    props: ['event'],

    mounted() {
        let dumpId = this.matchDumpId(this.event.label);

        if (dumpId) {
            window.Sfdump(dumpId);
        }
    },
    methods: {
        matchDumpId(dumpHtml) {
            const pattern = /sf-dump-([0-9]+)/gm;
            const matches = pattern.exec(dumpHtml);
            return matches[0] || null;
        }
    },
};
</script>
