<template>
    <div class="stack-main">
        <div class="stack-main-header">
            <div class="grid cols-auto gap-2 justify-start items-center">
                <ExceptionClass
                    :name="selectedFrame.class || ''"
                    :method="selectedFrame.method || ''"
                />
                <LineNumber :line-number="selectedFrame.line_number" />
            </div>
            <FilePath
                v-if="selectedFrame.file"
                class="mt-1"
                :line-number="selectedFrame.line_number"
                :file="selectedFrame.file"
                :editable="true"
            ></FilePath>
        </div>
        <div class="overflow-hidden">
            <span
                class="font-mono text-xs absolute right-0 top-0 m-2 p-1 text-gray-500 z-10 rounded-full bg-gray-100"
            >
                {{ selectedFrame.frame_number }}
            </span>
            <div class="absolute inset-0 flex overflow-auto bg-white text-xs scrollbar">
                <div class="sticky flex-none left-0 z-20">
                    <div class="min-h-full border-r border-gray-200 bg-gray-100 py-4 select-none">
                        <p
                            v-for="(code, line_number) in selectedFrame.code_snippet"
                            :key="line_number"
                            class="font-mono px-2 text-gray-600 leading-loose select-none cursor-pointer"
                            :class="{
                                'stack-line-selected': withinSelectedRange(
                                    parseInt(line_number, 10),
                                ),
                                'stack-line-highlight':
                                    parseInt(line_number, 10) === selectedFrame.line_number,
                            }"
                            @click="handleLineNumberClick($event, parseInt(line_number, 10))"
                        >
                            {{ line_number }}
                        </p>
                    </div>
                </div>
                <pre class="flex-grow py-4" ref="codeContainer"><p
                        v-for="(code, line_number, index) in selectedFrame.code_snippet"
                        :key="line_number"
                        :class="{
                            'stack-code-line-highlight': parseInt(line_number, 10) === selectedFrame.line_number,
                            'stack-code-line-selected': withinSelectedRange(parseInt(line_number, 10)),
                        }"
                        class="stack-code-line"
                    ><span v-html="highlightedCode(code, index)"></span><a v-if="config.codeEditor" :href="editorUrl(line_number)" class="editor-link" tabindex="-1"><i class="fa fa-pencil-alt"></i></a></p>
                </pre>
            </div>
        </div>
    </div>
</template>

<script>
import hljs from 'highlight.js/lib/highlight';
import php from 'highlight.js/lib/languages/php';
hljs.registerLanguage('php', php);

import ExceptionClass from '../../shared/ExceptionClass.vue';
import FilePath from '../components/FilePath.vue';
import LineNumber from '../components/LineNumber.vue';
import editorUrl from '../components/editorUrl';

export default {
    inject: ['config'],

    props: {
        selectedFrame: { required: true },
        selectedRange: { default: [null, null] },
    },

    components: {
        ExceptionClass,
        FilePath,
        LineNumber,
    },

    data() {
        return {
            firstSelectedLineNumber: null,
        };
    },

    created() {
        this.highlightState = null;
    },

    methods: {
        handleLineNumberClick(event, lineNumber) {
            if (event.shiftKey && this.firstSelectedLineNumber !== null) {
                this.$emit(
                    'select-range',
                    [this.firstSelectedLineNumber, lineNumber].sort((a, b) => a - b),
                );
            } else {
                this.firstSelectedLineNumber = lineNumber;
                this.$emit('select-range', [lineNumber, lineNumber]);
            }
        },
        withinSelectedRange(lineNumber) {
            if (!this.selectedRange) {
                return false;
            }

            return lineNumber >= this.selectedRange[0] && lineNumber <= this.selectedRange[1];
        },
        editorUrl(lineNumber) {
            return editorUrl(this.config, this.selectedFrame.file, lineNumber);
        },
        highlightedCode(code, index) {
            const result = hljs.highlight('php', code || '', true, this.highlightState);

            this.highlightState = result.top;

            if (index === this.code_snippet_length - 1) {
                this.highlightState = null;
            }

            return result.value || '&nbsp;';
        },
    },

    computed: {
        code_snippet_length() {
            return Object.keys(this.selectedFrame.code_snippet || {}).length;
        }
    },

    watch: {
        selectedFrame: {
            immediate: false,
            handler(val, oldVal) {
                this.highlightState = null;

                this.$nextTick(() => {
                    const snippet = this.$refs.codeContainer
                        .getElementsByClassName('stack-code-line-highlight')[0];

                    if (snippet) {
                        snippet.scrollIntoView({
                            behavior: 'auto',
                            block: 'center',
                            inline: 'center',
                        });
                    }
                });
            },
        },
    },
};
</script>
