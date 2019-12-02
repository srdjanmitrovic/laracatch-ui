<template>
    <Stack :frames="error.stacktrace" />
</template>

<script>
import Stack from '../Stack/Stack.vue';

export default {
    name: 'StackTab',

    inject: ['error'],

    components: {
        Stack,
    },
};
</script>
