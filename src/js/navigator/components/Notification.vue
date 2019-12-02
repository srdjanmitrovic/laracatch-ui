<template>
    <span class="notification">
        <span class="pulse"></span>
    </span>
</template>

<script>

</script>

<style type="text/css">
    .notification {
        @apply z-10;
        @apply bg-red-500;
        @apply rounded-full;
        @apply border-0;

        transition: ease-out 0.1s;
        margin-top: 4px;
        margin-left: 4px;
        width: 10px;
        height: 10px;
    }

    .pulse {
        @apply absolute;
        @apply border-red-500;
        @apply border-8;
        @apply opacity-0;

        background-color: transparent;
        border-radius: 40px;
        height: 40px;
        width: 40px;
        animation: pulse 3s linear infinite;
        top: -15px;
        left: -15px;
    }
</style>