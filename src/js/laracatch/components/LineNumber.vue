<template>
    <span class="inline-block px-1 bg-tint-50 text-tint-500 text-xs">
        :<span class="font-mono">{{ lineNumber }}</span>
    </span>
</template>

<script>
export default {
    props: {
        lineNumber: { required: true },
    },
};
</script>
