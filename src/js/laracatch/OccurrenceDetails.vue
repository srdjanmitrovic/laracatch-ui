<template>
    <div>
        <div class="flex items-center w-full" :class="{ 'mb-8': !hideSolutions }">
            <div class="flex flex-col flex-grow">
                <div class="text-2xl">
                    <ExceptionClass v-if="error.exception_class" :name="error.exception_class" />
                    <ExceptionMessage :name="error.message" />
                </div>

                <div v-if="error.context.request">
                    <span class="font-bold text-tint-500 mr-1">{{ error.method }}</span>
                    <a
                        class="underline text-tint-500 hover:text-tint-600 mt-4 focus:shadow-outline"
                        :href="error.context.request.url"
                        target="_blank"
                    >
                        {{ error.context.request.url }}
                    </a>
                </div>
            </div>

            <div class="z-1 flex-none" v-if="solutions.length > 0">
                <button
                    class="uppercase tracking-wide text-xs font-bold px-4 py-2 text-white rounded-full bg-green-500 focus:shadow-outline"
                    @click="hideSolutions = !hideSolutions"
                >
                    {{ hideSolutions ? 'Show Solutions' : 'Hide Solutions' }}
                    <i
                        class="ml-2 fas"
                        :class="{ 'fa-lightbulb': hideSolutions, 'fa-times': !hideSolutions }"
                    ></i>
                </button>
            </div>
        </div>
        <div v-if="!hideSolutions">
            <SolutionCard v-bind="{ solution }" />

            <div
                class="absolute left-0 bottom-0 w-full h-8 mb-2 px-4 text-sm z-10"
                v-if="solutions.length > 1"
            >
                <ul class="grid cols-auto place-center gap-1">
                    <li
                        v-for="(solution, key) in solutions"
                        @click="activeSolutionKey = key"
                        :key="solution.class"
                    >
                        <a
                            class="grid place-center h-8 min-w-8 px-2 rounded-full"
                            :class="{
                                'bg-tint-200 font-semibold': activeSolutionKey === key,
                                'hover:bg-tint-100 cursor-pointer': activeSolutionKey !== key,
                            }"
                        >
                            {{ key + 1 }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import FilePath from './components/FilePath';
import ExceptionMessage from '../shared/ExceptionMessage';
import ExceptionClass from '../shared/ExceptionClass';
import SolutionCard from './Solutions/SolutionCard';

export default {
    name: 'OccurrenceDetails',

    components: {
        ExceptionClass,
        ExceptionMessage,
        FilePath,
        SolutionCard,
    },

    inject: ['error', 'solutions', 'config'],

    data() {
        return {
            activeSolutionKey: 0,
            hideSolutions: true,
        };
    },

    computed: {
        firstFrame() {
            return this.error.stacktrace[0];
        },
        solution() {
            return this.solutions[this.activeSolutionKey];
        },
    },
};
</script>
