export default {
    functional: true,

    props: {
        label: { default: '' },
    },

    render(h, context) {
        return [
            h(
                'dt',
                {
                    attrs: {
                        class: 'description-term',
                    },
                },
                context.props.label || (context.scopedSlots.label ? context.scopedSlots.label() : null),
            ),
            h(
                'dd',
                {
                    attrs: {
                        class: 'description-details',
                    },
                },
                context.children,
            ),
        ];
    },
};
