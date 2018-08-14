'use strict';

import ProvidersTable from './providers-table.js';

(() => {
    let table = new ProvidersTable({
        element: document.querySelector('[data-component="providers-table"]'),
    });

    sendHttpRequest(
        'api/providers.php',
        (providers) => table.showProviders(providers),
        (err) => console.error(err)
    );

    function sendHttpRequest(url, successCallback, errorCallback) {
        let method = 'GET';
        let xhr = new XMLHttpRequest();

        xhr.open(method, url, true);
        xhr.send();

        xhr.onload = () => {
            let responseData = JSON.parse(xhr.responseText);

            successCallback(responseData);
        };

        xhr.onerror = () => {
            errorCallback(new Error(xhr.status + ': ' + xhr.statusText));
        }
    }

})();
