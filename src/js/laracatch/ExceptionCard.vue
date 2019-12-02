<template>
    <div class="mb-12">
        <div class="bg-white border rounded-lg shadow border-gray-300 py-6 z-10">
            <div class="mb-4 border-b pb-6 px-8">
                <div class="flex flex-grow justify-between">
                    <div class="flex items-center">
                        <div class="mr-4">
                            <Logo />
                        </div>
                        <FilePath
                            pathClass="text-xs text-gray-500 font-bold"
                            :file="error.application_path + config.directorySeparator"
                            :relative="false"
                        />
                        <div class="grid cols-auto items-center justify-end gap-4 px-4 py-2">
                            <div v-if="telescopeUrl">
                                <a
                                    :href="telescopeUrl"
                                    class="font-normal underline text-tint-600 hover:text-tint-700 sm:ml-6 focus:shadow-outline"
                                    target="_blank"
                                >
                                    Telescope <i class="fas fa-xs fa-external-link-alt"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex items-center">
                <div class="flex flex-col py-2 px-8 w-full md:px-8">
                    <OccurrenceDetails />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FilePath from './components/FilePath';
import Logo from '../shared/Logo';
import OccurrenceDetails from './OccurrenceDetails';

export default {
    name: 'ExceptionCard',

    components: {
        FilePath,
        Logo,
        OccurrenceDetails,
    },

    inject: ['error', 'telescopeUrl', 'config'],
};
</script>
