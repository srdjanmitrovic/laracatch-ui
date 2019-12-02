<template>
    <button title="Copy to clipboard" @click="copy(text)">
        <i
            class="far fa-clipboard"
            :class="copied ? 'text-gray-500' : 'text-gray-600 hover:text-gray-500'"
        ></i>
        <div v-if="copied" class="ml-2 absolute top-0 left-full text-gray-500">
            Copied!
        </div>
    </button>
</template>

<script>
export default {
    props: {
        text: { required: true },
    },

    data: () => ({
        copied: false,
        timeout: false,
    }),

    methods: {
        copy(text) {
            if (this.timeout) {
                window.clearTimeout(this.timeout);
            }
            const el = document.createElement('textarea');
            el.value = text;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);

            this.copied = true;
            this.timeout = window.setTimeout(() => (this.copied = false), 3000);
        },
    },
};
</script>
