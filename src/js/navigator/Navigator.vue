<template>
    <div>
        <Progress v-if="loading" class="z-50" />

        <button
            class="absolute m-6 text-gray-600 z-30 hover:text-black glow flex"
            @click.stop="toggleSidebar"
        >
            <svg
                aria-hidden="true"
                focusable="false"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="svg-inline--fa fa-bars fa-w-14 fa-fw fa-lg"
            >
                <path
                    fill="currentColor"
                    d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
                    class=""
                ></path>
            </svg>
            <notification v-if="difference > 0" style="position: absolute; top: -5px; left: 16px;" />
            <span class="font-bold text-xl ml-2">History ({{ exceptions.length }})</span>
        </button>

        <transition name="slide">
            <div
                v-if="sidebar"
                :class="{ 'side-open': sidebar }"
                class="side fixed flex flex-col break-words w-full p-8 md:w-1/2 xl:w-1/4 z-40 bg-gray-300"
                @click.stop
            >
                <div class="flex flex-row justify-between">
                    <div>
                        <button
                            class="bg-white text-red-500 uppercase tracking-wide text-xs px-4 py-2 rounded-full font-bold"
                            :class="filters ? 'text-gray-800' : ''"
                            @click="filters = !filters"
                        >
                            Filters
                            <i class="ml-2 fas fa-filter"></i>
                        </button>

                        <button
                            class="bg-red-500 uppercase tracking-wide text-xs px-4 py-2 rounded-full text-white font-bold"
                            @click="clear"
                        >
                            <i class="fas fa-trash-alt mr-1"></i> Delete All
                        </button>
                    </div>

                    <div>
                        <button
                            class="tracking-wide font-bold text-gray-600 hover:text-black glow"
                            @click="sidebar = !sidebar"
                        >
                            <svg
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                                class="svg-inline--fa fa-times fa-w-10 fa-fw"
                            >
                                <path
                                    fill="currentColor"
                                    d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
                                    class=""
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <transition name="fade">
                    <Filters v-if="filters" @change="filter" />
                </transition>

                <div class="mt-8 overflow-y-auto scrollbar" style="height: 850px;">
                    <transition-group name="slide-fade" tag="div">
                        <SidebarItem
                            v-for="(exception, index) in exceptions"
                            :key="exception.id"
                            :id="exception.id"
                            :exception="exception"
                            :selected="selected === exception.id"
                            @unmount="unmount"
                            @show-exception="showException"
                        />
                    </transition-group>
                </div>
            </div>
        </transition>

        <Backdrop v-if="sidebar" />

        <div class="container-fluid py-16 px-6 xl:px-32 mx-auto w-full">
            <div
                class="flex flex-wrap justify-center md:justify-between items-center mb-16 px-8 text-center md:text-left md:px-0"
            >
                <div class="mb-8 md:mb-0">
                    <h1 class="text-gray-800 text-4xl font-bold">Laracatch Navigator</h1>
                </div>
            </div>

            <div class="flex flex-row w-full flex-wrap">
                <div class="flex flex-col w-full px-8 md:px-0">
                    <div id="content-wrapper" class="rounded-lg"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import withQuery from 'with-query';

import SidebarItem from './components/SidebarItem';
import Progress from './components/Progress';
import Filters from './components/Filters';
import Backdrop from './components/Backdrop';
import Notification from './components/Notification';
import { getVisibility, getHidden } from './helpers';

export default {
    name: 'Navigator',
    props: {
        config: { required: true },
        endpoint: { required: true },
        shareEndpoint: { required: true },
    },
    components: {
        Backdrop,
        Filters,
        SidebarItem,
        Progress,
        Notification
    },
    async mounted() {
        await this.fetchExceptions();

        document.addEventListener(getVisibility(), this.onVisibilityChange, false);
    },
    beforeDestroy() {
        document.removeEventListener(getVisibility(), this.onVisibilityChange);
    },
    data() {
        return {
            sidebar: false,
            filters: false,
            exceptions: [],
            difference: 0,
            selected: null,
            app: null,
            loading: false,
        };
    },

    watch: {
        sidebar(open) {
            if (open) {
                window.addEventListener('click', this.toggleSidebar);
            } else {
                window.removeEventListener('click', this.toggleSidebar);
            }
        },
    },

    methods: {
        toggleSidebar() {
            this.sidebar = !this.sidebar;

            if (this.sidebar) {
                this.difference = 0;
            }
        },

        async filter(filters) {
            const query_filters = {};

            if (filters.console && filters.http) {
                //
            } else if (filters.console) {
                query_filters['console.eq'] = true;
            } else if (filters.http) {
                query_filters['console.neq'] = true;
            }

            if (filters.url) {
                query_filters['location.like'] = filters.url;
            }

            if (filters.method) {
                query_filters['method.eq'] = filters.method;
            }

            const url = withQuery(this.endpoint, {
                filters: query_filters,
            });

            this.loading = true;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });

                const responseData = await response.json();

                this.loading = false;

                if (response.ok) {
                    this.exceptions = responseData;
                } else {
                }
            } catch (error) {}
        },

        async fetchExceptions() {
            this.loading = true;

            try {
                const response = await fetch(this.endpoint, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });

                const responseData = await response.json();

                this.loading = false;

                if (response.ok) {
                    this.exceptions = responseData;

                    this.difference = responseData.length;
                } else {
                }
            } catch (error) {}
        },

        async showException(id) {
            this.loading = true;

            if (this.app) {
                this.unmount();
            }

            try {
                const response = await fetch(this.endpoint + '/' + id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });

                const responseData = await response.json();

                this.loading = false;

                if (response.ok) {
                    this.selected = id;

                    const content = document.createElement('div');
                    content.setAttribute('id', 'content');

                    document.getElementById('content-wrapper').appendChild(content);

                    this.app = window
                        .laracatcher({
                            error: responseData,
                            config: Object.assign({}, this.config, { navigator: false }),
                            shareEndpoint: this.shareEndpoint,
                            solutions: responseData.solutions || [],
                            embedded: true,
                        })
                        .start('#content');

                    this.sidebar = false;
                }
            } catch (error) {}
        },

        async onVisibilityChange() {
            if (document[getHidden()]) {
                //
            } else {
                await this.refresh();
            }
        },

        async refresh() {
            this.loading = true;

            try {
                let url = this.endpoint;

                if (this.exceptions.length) {
                    const last = this.exceptions.reduce(function(prev, current) {
                        return prev.seen_at > current.seen_at ? prev : current;
                    });

                    url = withQuery(url, {
                        filters: {
                            'seen_at.gt': last.seen_at,
                        },
                    });
                }

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });

                const responseData = await response.json();

                this.loading = false;

                if (response.ok) {
                    this.exceptions = responseData.concat(this.exceptions);

                    this.difference += responseData.length;
                } else {
                }
            } catch (error) {}
        },

        async clear() {
            this.loading = true;

            try {
                const response = await fetch(this.endpoint, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });

                const responseData = await response.json();

                this.loading = false;

                if (response.ok) {
                    this.exceptions = [];

                    this.difference = 0;

                    this.unmount();
                } else {
                }
            } catch (error) {}
        },

        unmount() {
            this.selected = null;

            this.app.$destroy();
            this.app.$el.remove();

            this.app = null;
        },
    },
};
</script>