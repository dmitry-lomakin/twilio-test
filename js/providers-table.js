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
            console.log(event.delegateTarget.closest('tr').dataset);
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
                        data-client-id="${ provider.id }" 
                        data-client-phone="${ provider.phone }">
                        
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
                            <button class="cell-button call-button">CALL</button>
                            <button class="cell-button ellipsis-button"><i class="fas fa-ellipsis-v"></i></button>
                        </td>
                        
                    </tr>
                `).join('') }
                </tbody>
            </table>
        `;
    }

}