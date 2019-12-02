import '../css/app.css';

import Navigator from './Navigator';

window.navigate = data => {
    return new Navigator(data);
};
