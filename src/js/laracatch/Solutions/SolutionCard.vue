<template>
    <div class="solution-main text-gray-800">
        <div
            class="absolute inset-0 bg-green-500 shadow border border-tint-300 overflow-hidden rounded-lg"
        >
            <svg
                class="hidden absolute right-0 h-full | md:block"
                style="transform: rotate(-45deg);"
                viewBox="0 0 116 116"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
            >
                <g
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                    style="opacity: 0.075"
                >
                    <path
                        d="M43.8153846,0 L43.8153846,71.8970565 L116,71.8970565 L116,116 L0,116 L0,0 L43.8153846,0 Z M29.8153846,14 L14,14 L14,102 L102,102 L102,85.8970565 L29.8153846,85.8970565 L29.8153846,14 Z M116,0 L116,28.5640899 L102,28.5640899 L102,14 L72,14 L72,44 L116,44 L116,58 L58,58 L58,0 L116,0 Z"
                        id="Logo"
                        fill="rgb(63,63,63)"
                        fill-rule="nonzero"
                    ></path>
                </g>
            </svg>
        </div>
        <div class="p-10">
            <div class="max-w-4xl ml-0">
                <h2 class="font-semibold text-2xl leading-tight mb-4">{{ solution.title }}</h2>

                <div v-if="solution.description" v-html="markdown(solution.description)"></div>

                <div v-if="solution.is_runnable">
                    <p v-html="markdown(solution.action_description)"></p>
                    <p v-if="canExecuteSolutions === null" class="py-4 text-sm italic">
                        Loading...
                    </p>
                    <div class="mt-4">
                        <button
                            v-if="
                                solution.is_runnable &&
                                    canExecuteSolutions === true &&
                                    executionSuccessful === null
                            "
                            @click="execute"
                            class="button-secondary button-lg bg-tint-300 hover:bg-tint-400"
                        >
                            {{ solution.run_button_text }}
                        </button>
                        <p v-if="executionSuccessful">
                            <strong class="font-semibold"
                                >The solution was executed succesfully.</strong
                            >
                            <a
                                href="#"
                                @click.prevent="refresh"
                                class="underline text-gray-700 hover:text-gray-800"
                            >
                                Refresh now.
                            </a>
                        </p>
                        <p v-if="executionSuccessful === false">
                            Something went wrong when executing the solution. Please try refresh the
                            page and try again.
                        </p>
                    </div>
                </div>

                <div
                    class="mt-8 grid justify-start"
                    v-if="Object.entries(solution.links).length > 0"
                >
                    <div class="border-t-2 border-gray-700 opacity-25 " />
                    <div class="pt-2 grid cols-auto-1fr gapx-4 gapy-2 text-sm">
                        <label class="font-semibold uppercase tracking-wider">Read more</label>
                        <ul>
                            <li v-for="(link, label) in solution.links" :key="label">
                                <a
                                    :href="link"
                                    class="underline text-gray-700 hover:text-gray-800"
                                    target="_blank"
                                    >{{ label }}</a
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const MarkdownIt = require('markdown-it')();

export default {
    inject: ['config'],

    props: {
        solution: { required: true },
    },

    data() {
        return {
            hide: true,
            canExecuteSolutions: null,
            executionSuccessful: null,
        };
    },

    computed: {
        healthCheckEndpoint() {
            return this.solution.execute_endpoint.replace('execute-solution', 'health-check');
        },
    },

    created() {
        this.configureRunnableSolutions();
    },

    methods: {
        getButtonText() {
            return this.hide ? 'Show Solutions' : 'Hide Solutions';
        },

        configureRunnableSolutions() {
            if (!this.config.enableRunnableSolutions) {
                this.canExecuteSolutions = false;

                return;
            }

            this.checkExecutionEndpoint();
        },

        markdown(string) {
            return MarkdownIt.render(string);
        },

        async checkExecutionEndpoint() {
            try {
                const healthCheck = await (await fetch(this.healthCheckEndpoint)).json();

                this.canExecuteSolutions = healthCheck.can_execute_commands;
            } catch (error) {
                this.canExecuteSolutions = false;
            }
        },

        async execute() {
            try {
                const response = await fetch(this.solution.execute_endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({
                        solution: this.solution.class,
                        parameters: this.solution.run_parameters,
                    }),
                });

                this.executionSuccessful = response.status === 200;
            } catch (error) {
                console.error(error);
                this.executionSuccessful = false;
            }
        },

        refresh() {
            location.reload();
        },
    },
};
</script>
