<template>
    <div
        class="block rounded-lg mb-8 cursor-pointer mr-4"
        :class="{ 'hover:shadow-xl': !selected }"
        @click="$emit('show-exception', id)"
    >
        <div class="rounded-t-lg text-white font-bold text-xs w-full px-4 py-2 bg-red-500">
            <span>{{ exception.exception_class }}</span>
        </div>

        <div
            class="rounded-b-lg p-4"
            :class="{ 'bg-red-200 text-gray-800': selected, 'bg-white text-gray-800': !selected }"
        >
            <p class="mb-2 font-bold">
                {{ exception.message | truncate }}
            </p>
            <a class="inline-block text-xs mb-1 text-gray-600" href="#">
                {{ location }}
            </a>
            <p class="text-xs text-gray-600 opacity-75">
                {{ exception.seen_at_microseconds | toDate }} | {{ exception.seen_at_microseconds | toHuman }}
            </p>
        </div>
    </div>
</template>

<script>
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

import ExceptionClass from '../../shared/ExceptionClass';
import ExceptionMessage from '../../shared/ExceptionMessage';

export default {
    name: 'SidebarItem',

    props: {
        id: { required: true },
        exception: { required: true },
        selected: {
            required: false,
            default: false,
        },
    },

    components: {
        ExceptionClass,
        ExceptionMessage,
    },

    computed: {
        location: function() {
            if (this.exception.context.request) {
                return this.exception.context.request.url;
            } else if (this.exception.context.arguments) {
                return this.exception.context.arguments.join(' ');
            }

            return '';
        },
    },

    filters: {
        toDate: function(timestamp) {
            return new Date(timestamp * 1000).toISOString();
        },
        toHuman: function(timestamp) {
            return timeAgo.format(new Date(timestamp * 1000));
        },
        truncate: function(str, length = 90, ellipses = '…') {
            if (str.length <= length) {
                return str;
            }

            ellipses = '' + ellipses;

            str = str.slice(0, length);

            return str + ellipses;
        },
    },
};
</script>
