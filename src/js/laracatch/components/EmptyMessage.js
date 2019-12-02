export default {
    functional: true,

    render(h, context) {
        return [
            h(
                'p',
                {
                    attrs: {
                        class:
                            'absolute inset-0 grid text-tint-500 py-8 text-center ' +
                            (context.data.staticClass || ''),
                    },
                },
                context.children || 'No data available for this Tab',
            ),
        ];
    },
};
