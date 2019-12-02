import Vue from 'vue';
import NavigatorComponent from './navigator/Navigator';

export default class Navigator {
    constructor(data) {
        this.data = data;
    }

    start() {
        new Vue({
            data: () => this.data,

            render(h) {
                return h(NavigatorComponent, {
                    props: {
                        config: this.config,
                        endpoint: this.endpoint,
                        shareEndpoint: this.shareEndpoint,
                    },
                });
            },
        }).$mount('#app');
    }
}
