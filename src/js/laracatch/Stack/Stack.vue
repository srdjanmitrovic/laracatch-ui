<template>
    <div class="stack">
        <div class="stack-nav">
            <div class="stack-nav-actions">
                <div class="stack-nav-arrows">
                    <button
                        @click="selectPreviousFrame"
                        title="Frame up (Key:Z)"
                        class="text-xs text-gray-500 hover:text-gray-700 focus:shadow-outline"
                    >
                        <i class="fas fa-arrow-up" />
                    </button>
                    <button
                        @click="selectNextFrame"
                        title="Frame down (Key:X)"
                        class="text-xs text-gray-500 hover:text-gray-700 focus:shadow-outline"
                    >
                        <i class="fas fa-arrow-down" />
                    </button>
                </div>
                <div class="px-4">
                    <button
                        v-if="allVendorFramesAreExpanded"
                        class="ml-auto font-normal underline text-tint-600 hover:text-tint-700 focus:shadow-outline"
                        title="Collapse vendor frames (Key:<)"
                        @click="collapseVendorFrames"
                    >
                        Collapse vendor frames
                    </button>
                    <button
                        v-else
                        class="ml-auto font-normal underline text-tint-600 hover:text-tint-700 focus:shadow-outline"
                        title="Expand vendor frames (Key:<)"
                        @click="expandVendorFrames"
                    >
                        Expand vendor frames
                    </button>
                </div>
            </div>
            <div class="overflow-hidden border-t border-gray-200">
                <ol
                    class="absolute inset-0 overflow-x-hidden overflow-y-auto scrollbar"
                    ref="stackContainer"
                >
                    <FrameGroup
                        v-for="(frameGroup, i) in frameGroups"
                        :key="i"
                        :frameGroup="frameGroup"
                        @expand="expandFrameGroup(frameGroup)"
                        @select="selectFrame"
                    />
                </ol>
            </div>
        </div>
        <Snippet
            :selected-frame="selectedFrame"
            :selected-range="selectedRange"
            @select-range="selectedRange = $event"
        />
    </div>
</template>

<script>
import Snippet from './Snippet';
import FrameGroup from './FrameGroup';

import { decodeSelectedFrameAndLines } from '../helpers';

import { state, getters, mutations } from '../store';

export default {
    props: {
        frames: {
            required: true,
            type: Array,
        },
    },

    data() {
        return {
            selectedRange: null,
        };
    },

    components: {
        Snippet,
        FrameGroup,
    },

    created() {
        this.initializeState();

        this.collapseVendorFrames();

        const matches = decodeSelectedFrameAndLines(window.location.hash.substr(1));

        if (matches) {
            this.selectFrame(parseInt(matches[1], 10));

            if (matches[3]) {
                const [first, last] = matches[3].split('-');

                this.selectedRange = [
                    parseInt(first, 10),
                    last ? parseInt(last, 10) : parseInt(first, 10),
                ];
            }
        }

        const keydownHandler = e => {
            if (e.key === 'z') {
                this.selectPreviousFrame();
            }

            if (e.key === 'x') {
                this.selectNextFrame();
            }

            if (e.key === '<') {
                if (this.allVendorFramesAreExpanded) {
                    this.collapseVendorFrames();
                } else {
                    this.expandVendorFrames();
                }
            }
        };

        window.addEventListener('keydown', keydownHandler);

        this.$once('hook:beforeDestroy', () => {
            window.removeEventListener('keydown', keydownHandler);
        });
    },

    computed: {
        allVendorFramesAreExpanded() {
            return getters.areAllVendorFramesExpanded();
        },

        frameGroups() {
            return getters.frameGroups();
        },

        selectedFrame() {
            return getters.selectedFrame();
        },
    },

    watch: {
        selectedRange(selectedRange) {
            if (selectedRange) {
                const lineNumber =
                    selectedRange[0] === selectedRange[1]
                        ? selectedRange[0]
                        : `${selectedRange[0]}-${selectedRange[1]}`;

                window.history.replaceState(
                    window.history.state,
                    '',
                    `#F${this.state.selected}L${lineNumber}`,
                );
            }
        },
    },

    methods: {
        initializeState() {
            state.frames = this.frames;
            state.selected = this.frames.length;

            this.state = state;
        },

        expandFrameGroup(frameGroup) {
            mutations.expandFrameGroup(frameGroup);
        },

        selectFrame(frame) {
            this.selectedRange = null;

            window.history.replaceState(window.history.state, '', `#F${frame}`);

            mutations.selectFrame(frame);
        },

        selectNextFrame() {
            mutations.selectNextFrame();

            this.scrollIntoView();

            window.history.replaceState(window.history.state, '', `#F${this.state.selected}`);
        },

        selectPreviousFrame() {
            mutations.selectPreviousFrame();

            this.scrollIntoView();

            window.history.replaceState(window.history.state, '', `#F${this.state.selected}`);
        },

        collapseVendorFrames() {
            mutations.collapseVendorFrames();
        },

        expandVendorFrames() {
            mutations.expandVendorFrames();
        },

        scrollIntoView() {
            this.$nextTick(() => {
                this.$refs.stackContainer
                    .getElementsByClassName('stack-frame-selected')[0]
                    .scrollIntoView({
                        behavior: 'auto',
                        block: 'center',
                        inline: 'center',
                    });
            });
        },
    },
};
</script>
