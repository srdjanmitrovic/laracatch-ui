<template>
    <span class="inline-block leading-tight text-gray-600;">
        <!-- Keep tags tight to prevent whitespace between segments -->
        <span v-for="(segment, index) in segments" :key="index" class="opacity-75"
            >{{ segment }}\<wbr /></span
        ><span>{{ segmentsClass }}</span
        ><span v-if="method" class="opacity-75">::{{ method }}</span>
    </span>
</template>

<script>
export default {
    name: 'ExceptionClass',

    props: {
        name: { required: true },
        method: { default: null },
    },

    data() {
        return {
            segments: [],
            segmentsClass: '',
        };
    },

    watch: {
        name: {
            immediate: true,
            handler() {
                this.segments = this.name.split('\\');
                this.segmentsClass = this.segments.pop();
            },
        },
    },
};
</script>
