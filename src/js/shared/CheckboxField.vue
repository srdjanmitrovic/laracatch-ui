<template>
    <label
        :for="name"
        class="checkbox-label"
        :class="disabled ? 'text-gray-400 pointer-events-none' : ''"
    >
        <input
            :id="name"
            :checked="value"
            @change="checkboxChanged"
            type="checkbox"
            class="checkbox focus:shadow-outline"
            :class="disabled ? '' : 'cursor-pointer'"
            :disabled="disabled"
        />
        {{ label }}
        <i v-if="icon" class="fas leading-normal" :class="icon"></i>
    </label>
</template>

<script>
export default {
    props: {
        icon: { required: false },
        label: { required: true },
        name: { required: true },
        disabled: { required: false },
        value: { required: false, default: false },
    },

    methods: {
        checkboxChanged(event) {
            this.$emit('input', event.target.checked);
        },
    },
};
</script>
