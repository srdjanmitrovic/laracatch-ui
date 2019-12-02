import get from 'lodash/get';
import Vue from 'vue';
import App from './laracatch/App';

Vue.mixin({
    methods: {
        get(obj, path, def = null) {
            return get(obj, path, def);
        },
    },
});

export default class Laracatch {
    constructor(data) {
        this.data = data;

        this.tabCallbacks = [];
    }

    registerBuiltinTabs() {
        Vue.component('AppTab', require('./laracatch/Tabs/AppTab').default);
        Vue.component('ContextTab', require('./laracatch/Tabs/ContextTab').default);
        Vue.component('DebugTab', require('./laracatch/Tabs/DebugTab').default);
        Vue.component('QueryTab', require('./laracatch/Tabs/QueryTab').default);
        Vue.component('RequestTab', require('./laracatch/Tabs/RequestTab').default);
        Vue.component('StackTab', require('./laracatch/Tabs/StackTab').default);
        Vue.component('UserTab', require('./laracatch/Tabs/UserTab').default);
    }

    registerCustomTabs() {
        this.tabCallbacks.forEach(callback => callback(Vue, this.data));

        this.tabCallbacks = [];
    }

    registerTab(callback) {
        this.tabCallbacks.push(callback);
    }

    start(element) {
        this.registerBuiltinTabs();

        this.registerCustomTabs();

        const app = new Vue({
            data: () => this.data,

            render(h) {
                return h(App, {
                    props: {
                        error: {
                            ...this.error,
                            stacktrace: this.error.stacktrace.map((frame, i) => ({
                                ...frame,
                                frame_number: this.error.stacktrace.length - i,
                                relative_file: frame.file ?
                                    frame.file.replace(
                                        `${this.error.application_path}/`,
                                        '',
                                    )
                                    : '',
                            })),
                        },
                        config: this.config,
                        customTabs: window.tabs || [],
                        solutions: this.error.solutions || [],
                        embedded: this.embedded,
                        telescopeUrl: this.telescopeUrl,
                        shareEndpoint: this.shareEndpoint,
                        defaultTab: this.defaultTab || 'StackTab',
                        defaultProps: this.defaultProps || {}
                    },
                });
            },
        }).$mount(element);

        return app;
    }
}
