import upperFirst from 'lodash/upperFirst';

class Event {
    constructor({
        microtime,
        type,
        label,
        metadata = null,
        context = null,
        file = null,
        line_number = null,
    }) {
        this.microtime = microtime;
        this.type = type;
        this.label = label;
        this.metadata = metadata;
        this.context = context;
        this.file = file;
        this.line_number = line_number;
    }

    static forQuery({ microtime, sql, time, measure_unit, connection_name, bindings }) {
        return new Event({
            microtime,
            type: 'query',
            label: sql,
            metadata: {
                time,
                measure_unit,
                connection_name,
            },
            context: bindings,
        });
    }

    static forDump({ microtime, html_dump, file, line_number }) {
        return new Event({
            microtime,
            type: 'dump',
            label: html_dump,
            file,
            line_number,
        });
    }

    static forLog({ microtime, context, level, message }) {
        return new Event({
            microtime,
            type: 'log',
            label: message,
            context,
            metadata: { level },
        });
    }

    static forBreadcrumb({ microtime, log_level, meta, message, time }) {
        return new Event({
            microtime,
            type: 'breadcrumb',
            label: message,
            context: meta,
            metadata: { time, log_level },
        });
    }

    static forEvent({ name, params, listeners, microtime }) {
        return new Event({
            microtime,
            type: 'event',
            label: name,
            metadata: { params, listeners },
        });
    }

    getComponentName() {
        return upperFirst(this.type) + 'Event';
    }
}

export default Event;
