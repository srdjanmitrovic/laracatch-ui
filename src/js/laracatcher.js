import '../css/app.css';

require('./vendor/symfony');

import Laracatch from './Laracatch';

window.laracatcher = data => {
    return new Laracatch(data);
};
