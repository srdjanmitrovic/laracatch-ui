<template>
    <div class="inline-block" @click.stop>
        <button
            class="bg-white text-red-500 uppercase tracking-wide text-xs px-4 py-2 rounded-full font-bold border focus:shadow-outline"
            :class="menuVisible ? 'text-gray-800' : ''"
            @click="toggleMenu"
        >
            Share
            <i class="ml-2 fas fa-share"></i>
        </button>
        <transition name="top">
            <div
                v-if="menuVisible"
                class="absolute mt-6 bg-white border border-gray-300 z-10 right-0 top-full p-8 overflow-visible rounded-lg shadow-md"
                @click.stop
                style="min-width: 20rem;"
            >
                <div class="flex items-center mb-4">
                    <div class="flex items-center">
                        <div class="mr-4">
                            <Logo />
                        </div>
                        <h3 class="font-semibold text-gray-800 uppercase tracking-wide">
                            {{ sharedErrorUrls ? 'Shared' : 'Share' }}
                        </h3>
                    </div>
                </div>
                <div v-if="sharedErrorUrls">
                    <ShareLinks
                        :publicUrl="sharedErrorUrls.public_url"
                        :ownerUrl="sharedErrorUrls.owner_url"
                    />
                </div>
                <ShareForm v-else @share="shareError" :loading="loading" :error="shareHadError" />
            </div>
        </transition>
    </div>
</template>

<script>
import Logo from '../../shared/Logo';
import ShareForm from './ShareForm';
import ShareLinks from './ShareLinks';

export default {
    name: 'ShareButton',

    components: {
        Logo,
        ShareLinks,
        ShareForm,
    },

    inject: ['error', 'shareEndpoint'],

    data() {
        return {
            shareHadError: false,
            sharedErrorUrls: null,
            menuVisible: false,
            loading: false,
        };
    },

    watch: {
        menuVisible(menuVisible) {
            if (menuVisible) {
                window.addEventListener('click', this.toggleMenu);
            } else {
                window.removeEventListener('click', this.toggleMenu);
            }
        },
    },

    methods: {
        toggleMenu() {
            this.menuVisible = !this.menuVisible;
        },

        async shareError(selectedTabs) {
            this.loading = true;

            try {
                const response = await fetch(this.shareEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({
                        error: JSON.stringify(this.error),
                        tabs: selectedTabs,
                        lineSelection: window.location.hash,
                    }),
                });
                const responseData = await response.json();

                if (response.ok) {
                    this.sharedErrorUrls = responseData;
                } else {
                    this.shareHadError = true;
                }
            } catch (error) {
                this.shareHadError = true;
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
