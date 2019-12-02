<template>
    <span class="inline-flex">
        <span :class="pathClass" class="inline-block leading-tight" v-on="$listeners">
            <!-- Keep tags tight to prevent whitespace between segments -->
            <span v-for="(segment, index) in segments" :key="`segment-${index}`"
                >{{ segment }}/<wbr /></span
            ><span
                v-for="(fileSegment, index) in fileSegments"
                :key="`file-${index}`"
                :class="index === 0 ? 'font-semibold' : ''"
                >{{ index > 0 ? '.' : '' }}{{ fileSegment }}</span
            ><span v-if="lineNumber">:{{ lineNumber }}</span>
        </span>
        <slot></slot>
        <a
            v-if="editable && config.codeEditor"
            :href="editorUrl"
            class="ml-2 inline-block text-sm text-red-500 hover:opacity-50 focus:shadow-outline"
            ><i class="fas fa-pencil-alt"></i
        ></a>
    </span>
</template>

<script>
import editorUrl from './editorUrl';

export default {
    name: 'FilePath',

    props: {
        file: { required: true },
        editable: { default: false },
        relative: { default: true },
        lineNumber: { required: false },
        pathClass: { default: '' },
    },

    data() {
        return {
            segments: [],
            filename: '',
            fileSegments: [],
        };
    },

    inject: ['config', 'error'],

    watch: {
        file: {
            immediate: true,
            handler() {
                this.segments = this.path.replace(/^\/Users/, '~').split('/');
                this.filename = this.segments.pop() || '';
                this.fileSegments = this.filename.split('.');
            },
        },
    },

    computed: {
        path() {
            return this.relative
                ? this.file.replace(this.error.application_path + '/', '')
                : this.file;
        },

        editorUrl() {
            return editorUrl(this.config, this.file, this.lineNumber);
        },
    },
};
</script>
