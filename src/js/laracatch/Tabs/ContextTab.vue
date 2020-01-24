<template>
    <div class="tab-details">
        <div class="layout-col">
            <DescriptionList
                v-for="(contextGroup, groupTitle) in customContextGroups"
                :key="groupTitle"
                :title="groupTitle"
                class="tab-details-section"
            >
                <DescriptionListRow v-for="(value, key) in contextGroup" :key="key" :label="key">{{
                    value
                }}</DescriptionListRow>
            </DescriptionList>

            <DescriptionList title="Framework information" class="tab-details-section">
                <DescriptionListRow v-for="(value, key) in framework" :key="key" :label="lookupKey(key)">{{
                    value
                }}</DescriptionListRow>
            </DescriptionList>

            <DescriptionList title="Generic context" class="tab-details-section">
                <DescriptionListRow v-for="(value, key) in context" :key="key" :label="key">{{
                    value
                }}</DescriptionListRow>
            </DescriptionList>

            <section v-if="git" class="tab-details-section">
                <DescriptionList title="Git">
                    <DescriptionListRow v-if="repoUrl" label="Repository">
                        <a class="underline" :href="repoUrl" target="_blank">{{ repoUrl }}</a>
                    </DescriptionListRow>
                    <DescriptionListRow v-if="git.message" label="Message">
                        <a :href="commitUrl" target="_blank">
                            “{{ git.message }}” –
                            <code class="code underline">{{ git.hash }}</code>
                        </a>
                    </DescriptionListRow>
                    <DescriptionListRow v-if="git.tag" label="Tag">{{ git.tag }}</DescriptionListRow>
                    <div class="mt-4 sm:start-2" v-if="git.is_dirty">
                        <div
                            class="inline-block min-h-0 bg-yellow-100 border-l-4 border-yellow-400 p-4 text-gray-700"
                        >
                            This commit is dirty. (Un)staged changes have been made since this
                            commit.
                        </div>
                    </div>
                    <div class="mt-4 sm:start-2" v-if="! git.is_initialized">
                        <div
                            class="inline-block min-h-0 bg-red-100 border-l-4 border-red-400 p-4 text-gray-700"
                        >
                            No Git repository has been detected in this project.
                        </div>
                    </div>
                </DescriptionList>
            </section>
        </div>
    </div>
</template>

<script>
import gitUrlParse from 'git-url-parse';
import DescriptionList from '../components/DescriptionList';
import DescriptionListRow from '../components/DescriptionListRow.js';
import upperFirst from 'lodash/upperFirst';

const predefinedKeys = {
    laravel_version: 'Laravel version',
    laravel_locale: 'Laravel locale',
    laravel_config_cached: 'Laravel config cached',
    php_version: 'PHP version',
};

const predefinedContextItemGroups = [
    'request',
    'request_data',
    'headers',
    'session',
    'cookies',
    'view',
    'queries',
    'route',
    'user',
    'framework',
    'git',
    'context',
    'logs',
    'dumps',
    'events',
];

export default {
    name: 'ContextTab',

    inject: ['error'],

    components: {
        DescriptionListRow,
        DescriptionList
    },

    filters: {
        upperFirst,
    },

    computed: {
        git() {
            return this.error.context.git;
        },

        framework() {
            return this.error.context.framework;
        },

        context() {
            return this.error.context.context;
        },

        repoInfo() {
            return gitUrlParse(this.git.remote);
        },

        repoUrl() {
            if (!this.git.remote) {
                return null;
            }

            const git = {
                ...this.repoInfo,
                git_suffix: false,
            };

            return gitUrlParse.stringify(git, 'https');
        },

        commitUrl() {
            return `${this.repoUrl}/commit/${this.git.hash.replace(/'/g, '')}`;
        },

        tagUrl() {
            return this.git.tag ? `${this.repoUrl}/releases/tag/${this.git.tag}` : this.repoUrl;
        },

        customContextGroups() {
            const customGroups = Object.keys(this.error.context).filter(
                key => !predefinedContextItemGroups.includes(key),
            );

            return Object.assign(
                {},
                ...customGroups.map(prop => {
                    return {
                        [prop]: this.error.context[prop],
                    };
                }),
            );
        },
    },

    methods: {
        lookupKey(key) {
            return predefinedKeys[key] || key;
        },
    },
};
</script>
