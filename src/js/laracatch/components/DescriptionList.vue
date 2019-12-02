<template>
    <div>
        <h3 v-if="title" class="description-list-title">{{ title }}</h3>
        <dl v-if="this.$slots.default" class="description-list">
            <slot></slot>
        </dl>
        <div v-else class="description-list">
            <div class="description-list-empty">—</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DescriptionList',

    props: {
        title: { default: '' },
    },
};
</script>
