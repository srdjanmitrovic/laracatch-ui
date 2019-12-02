<template>
    <div class="p-4 break-all">
        <div class="flex flex-row items-center">
            <div class="flex-1">
                <h5 class="font-bold uppercase text-red-500 tracking-wide text-xs mb-1">
                    {{ title }}
                </h5>
                <h4 class="text-gray-600 text-sm">{{ value }}</h4>
            </div>
            <div class="hidden flex-shrink pl-4 text-right xl:flex">
                <div class="rounded p-3 text-gray-300 text-xs">
                    <i class="fas fa-2x fa-fw" :class="icon"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SummaryItem',

    props: {
        title: {
            type: String,
            required: true,
        },
        value: {
            type: Number | String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
    },
};
</script>
