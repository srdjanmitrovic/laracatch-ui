import Vue from 'vue';
import uniq from 'lodash/uniq';

import { getFrameType, isUnknownFrame, isVendorFrame } from './helpers';

const baseFrameGroup = {
    type: 'application',
    relative_file: '',
    expanded: true,
    frames: [],
};

function parseExpandedFrame(context) {
    if (context.current.relative_file !== context.previous.relative_file) {
        return [
            {
                type: getFrameType(context.current),
                relative_file: context.current.relative_file,
                expanded: true,
                frames: [
                    {
                        ...context.current,
                        selected: context.selected === context.current.frame_number,
                    },
                ],
            },
        ];
    }

    context.previous.frames.push({
        ...context.current,
        selected: context.selected === context.current.frame_number,
    });

    return [];
}

function parseCollapsedFrame(context) {
    const type = getFrameType(context.current);

    if (!context.previous.expanded && type === context.previous.type) {
        context.previous.frames.push({
            ...context.current,
            selected: false,
        });

        return [];
    }

    return [
        {
            type,
            relative_file: context.current.relative_file,
            expanded: false,
            frames: [
                {
                    ...context.current,
                    selected: context.selected === context.current.frame_number,
                },
            ],
        },
    ];
}

export const state = Vue.observable({
    frames: [],
    expanded: [],
    selected: null,
});

export const getters = {
    /**
     * Determine if all vendor frames are expanded.
     * @return {Boolean}
     */
    areAllVendorFramesExpanded() {
        return state.frames
            .filter(isVendorFrame)
            .every(frame => state.expanded.includes(frame.frame_number));
    },

    /**
     * Return the selected frame.
     * @return {Frame}
     */
    selectedFrame() {
        return state.frames.find(frame => frame.frame_number === state.selected);
    },

    /**
     * Group frames.
     * @return {Array}
     */
    frameGroups() {
        return state.frames.reduce((frameGroups, current, i) => {
            const context = {
                current,
                previous: frameGroups[frameGroups.length - 1] || baseFrameGroup,
                expanded: state.expanded,
                selected: state.selected,
            };

            if (context.expanded.includes(context.current.frame_number)) {
                return frameGroups.concat(parseExpandedFrame(context));
            }

            return frameGroups.concat(parseCollapsedFrame(context));
        }, []);
    },
};

export const mutations = {
    /**
     * Collapse all vendor frames.
     * @return {void}
     */
    collapseVendorFrames() {
        const applicationFrameNumbers = state.frames
            .filter(frame => !isVendorFrame(frame) && !isUnknownFrame(frame))
            .map(frame => frame.frame_number);

        state.expanded = uniq([...applicationFrameNumbers, state.frames.length]);
    },

    /**
     * Expand all vendor frames
     * @return {void}
     */
    expandVendorFrames() {
        const knownFrameNumbers = state.frames
            .filter(frame => !isUnknownFrame(frame))
            .map(frame => frame.frame_number);

        state.expanded = knownFrameNumbers;
    },

    /**
     * Expand a frame group.
     * @param  {FrameGroup} frameGroup
     * @return {void}
     */
    expandFrameGroup(frameGroup) {
        const targetFrameNumbers = frameGroup.frames.map(frame => frame.frame_number);

        state.expanded = uniq([...state.expanded, ...targetFrameNumbers]);
    },

    /**
     * Select a frame.
     * @param  {Frame} frame
     * @return {void}
     */
    selectFrame(frame) {
        const selectableFrameNumbers = state.frames
            .filter(frame => !isUnknownFrame(frame))
            .map(frame => frame.frame_number);

        const selected = selectableFrameNumbers.includes(frame) ? frame : state.selected;

        state.expanded = uniq([...state.expanded, selected]);
        state.selected = selected;
    },

    /**
     * Select next frame in the stack.
     * @return {void}
     */
    selectNextFrame() {
        const selectableFrameNumbers = state.frames
            .filter(frame => !isUnknownFrame(frame))
            .map(frame => frame.frame_number);

        const selectedIndex = selectableFrameNumbers.indexOf(state.selected);

        const selected =
            selectedIndex === selectableFrameNumbers.length - 1
                ? selectableFrameNumbers[0]
                : selectableFrameNumbers[selectedIndex + 1];

        state.expanded = uniq([...state.expanded, selected]);
        state.selected = selected;
    },

    /**
     * Select the previous frame in the stack.
     * @return {void}
     */
    selectPreviousFrame() {
        const selectableFrameNumbers = state.frames
            .filter(frame => !isUnknownFrame(frame))
            .map(frame => frame.frame_number);

        const selectedIndex = selectableFrameNumbers.indexOf(state.selected);

        const selected =
            selectedIndex === 0
                ? selectableFrameNumbers[selectableFrameNumbers.length - 1]
                : selectableFrameNumbers[selectedIndex - 1];

        state.expanded = uniq([...state.expanded, selected]);
        state.selected = selected;
    },
};
