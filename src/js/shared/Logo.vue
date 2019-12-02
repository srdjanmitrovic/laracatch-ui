<template>
    <svg
        :height="height"
        viewBox="0 0 116 116"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
    >
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path
                d="M43.8153846,0 L43.8153846,71.8970565 L116,71.8970565 L116,116 L0,116 L0,0 L43.8153846,0 Z M29.8153846,14 L14,14 L14,102 L102,102 L102,85.8970565 L29.8153846,85.8970565 L29.8153846,14 Z M116,0 L116,28.5640899 L102,28.5640899 L102,14 L72,14 L72,44 L116,44 L116,58 L58,58 L58,0 L116,0 Z"
                id="Logo"
                fill="#f9292c"
                fill-rule="nonzero"
            ></path>
        </g>
    </svg>
</template>

<script>
export default {
    name: 'Logo',
    props: {
        height: {
            type: Number,
            default: 20,
        },
    },
};
</script>
