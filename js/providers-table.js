'use strict';

import Component from './component.js';

export default class ProvidersTable extends Component {

    constructor ({ element }) {
        super({ element });

        this.on('mousedown', '.chat-button', (event) => {
            event.delegateTarget.classList.add('pressed');
        });

        this.on('mouseup', '.chat-button', (event) => {
            event.delegateTarget.classList.remove('pressed');
        });

        this.on('mousedown', '.call-button', (event) => {
            event.delegateTarget.classList.add('pressed');
        });

        this.on('mouseup', '.call-button', (event) => {
            event.delegateTarget.classList.remove('pressed');
        });

        this.on('click', '.call-button', (event) => {
            if ('0' !== event.delegateTarget.dataset.callInProgress) {
                return;
            }

            let { providerId, providerPhone } = event.delegateTarget.closest('tr').dataset;

            event.delegateTarget.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calling the admin';

            fetch(`api/index.php?provider_id=${ providerId }&phone_number=${ encodeURIComponent(providerPhone) }`)
                .then(() => this._trackCallProgress(providerId));
        });
    }

    showProviders(providers) {
        this._render(providers);
    }

    _render(providers) {
        this._element.innerHTML = `
            <h1>Matched providers</h1>

            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>ID</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                ${ providers.map((provider, idx) => `
                    <tr${ idx % 2 ? '' : ' class="even"' } 
                        data-provider-id="${ provider.id }" 
                        data-provider-phone="${ provider.phone }">
                        
                        <td class="type-cell">
                            <i class="fas fa-fw fa-flag"></i>
                            <i class="fas fa-fw fa-user-alt"></i>
                        </td>
                        <td>${ provider.name }</td>
                        <td>${ provider.email }</td>
                        <td>${ provider.phone }</td>
                        <td>${ provider.id }</td>
                        <td><i class="${ provider.status[1] }"></i> ${ provider.status[0] }</td>
                        <td>
                            <button class="cell-button chat-button">CHAT</button>
                            <button class="cell-button call-button" data-call-in-progress="0">CALL</button>
                            <button class="cell-button ellipsis-button"><i class="fas fa-ellipsis-v"></i></button>
                        </td>
                        
                    </tr>
                `).join('') }
                </tbody>
            </table>
        `;
    }

    _trackCallProgress(providerId) {
        fetch(`api/get_call_status.php?provider_id=${ providerId }`)
            .then((response) => {
                return response.json();
            })
            .then((status) => {
                let button = document.querySelector(`tr[data-provider-id="${ providerId }"]`).querySelector('button.call-button');

                if (null !== status) {
                    switch (parseInt(status, 10)) {
                        case -1:
                            button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> An error has occurred';
                            setTimeout(() => ProvidersTable._resetCallButtonToDefault(button), 3000);

                            break;
                        case 0:
                            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calling the admin';
                            setTimeout(() => this._trackCallProgress(providerId), 1000);

                            break;
                        case 1:
                            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calling the provider';
                            setTimeout(() => this._trackCallProgress(providerId), 1000);

                            break;
                    }
                } else {
                    button.innerHTML = '<i class="fas fa-check"></i> Call completed';
                    setTimeout(() => ProvidersTable._resetCallButtonToDefault(button), 3000);
                }
            })
            .catch(console.error);
    }

    static _resetCallButtonToDefault(button) {
        button.innerHTML = 'CALL';
        button.dataset.callInProgress = '0';
    }

}