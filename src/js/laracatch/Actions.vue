<template>
    <div class="text-right" :class="{ 'mb-6': navigator || sharing }">
        <template v-if="navigator">
            <li class="inline-block mr-4">
                <NavigatorButton />
            </li>
        </template>
        <template v-if="sharing">
            <li class="inline-block">
                <ShareButton />
            </li>
        </template>
    </div>
</template>

<script>
import ShareButton from './Share/ShareButton';
import NavigatorButton from './NavigatorButton';

export default {
    name: 'Actions',

    inject: ['config'],

    components: {
        NavigatorButton,
        ShareButton,
    },

    computed: {
        navigator: function () {
            return this.config.navigator;
        },

        sharing: function () {
            return this.config.sharing;
        }
    }

};
</script>
