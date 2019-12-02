<template>
    <div class="text-center md:text-left">
        <form
            class="z-10 right-0 top-full bg-white mt-8 p-8 overflow-visible rounded-lg shadow-md"
            @submit.prevent
            @change="onChange"
            @click.stop
        >
            <div class="flex items-center mb-4">
                <div class="flex items-center">
                    <div class="mr-4">
                        <Logo />
                    </div>
                    <h3 class="font-semibold text-gray-800 uppercase tracking-wide">
                        Filters
                    </h3>
                </div>
            </div>

            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                    <label class="block text-gray-600 text-sm mb-1 md:mb-0 pr-4">
                        Location
                    </label>
                </div>
                <div class="md:w-2/3">
                    <input
                        class="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight text-sm focus:outline-none focus:bg-white focus:border-red-500"
                        id="inline-full-name"
                        type="text"
                        v-model.lazy.trim="filters.url"
                    />
                </div>
            </div>

            <div class="md:flex md:items-center mb-8" v-if="filters.http">
                <div class="md:w-1/3">
                    <label class="block text-gray-600 text-sm mb-1 md:mb-0 pr-4">Method</label>
                </div>
                <div class="md:w-2/3">
                    <div class="relative">
                        <select
                            class="block text-sm appearance-none w-full border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            v-model="filters.method"
                        >
                            <option value="">*</option>
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                        <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                        >
                            <svg
                                class="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid cols-2 justify-start gapx-6 gapy-2 pb-2">
                <CheckboxField
                    label="Console"
                    name="console"
                    v-model="filters.console"
                    class="text-gray-600 text-sm"
                    :disabled="filters.console && !filters.http"
                />
                <CheckboxField
                    label="HTTP"
                    name="http"
                    v-model="filters.http"
                    class="text-gray-600 text-sm"
                    :disabled="filters.http && !filters.console"
                />
            </div>
        </form>
    </div>
</template>

<script>
import Logo from '../../shared/Logo';
import CheckboxField from '../../shared/CheckboxField';

export default {
    name: 'Filters',
    components: {
        CheckboxField,
        Logo,
    },
    data() {
        return {
            filters: {
                console: true,
                http: true,
                url: '',
                method: '',
            },
        };
    },

    methods: {
        onChange(e) {
            this.$emit('change', {
                ...this.filters,
            });
        },
    },
};
</script>
