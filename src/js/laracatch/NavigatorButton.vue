<template>
    <a
        class="bg-red-500 uppercase tracking-wide text-xs py-2 rounded-full text-white font-bold px-4 focus:shadow-outline"
        :href="url"
        target="_blank"
    >
        Navigator
        <i class="ml-2 fas fa-search"></i>
    </a>
</template>

<script>
export default {
    name: 'NavigatorButton',

    inject: ['config'],

    computed: {
        url() {
            return '/' + this.config.routePrefix + '/navigator';
        },
    },
};
</script>
