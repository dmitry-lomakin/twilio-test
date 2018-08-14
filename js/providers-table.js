'use strict';

import Component from './component.js';

export default class ProvidersTable extends Component {

    constructor ({ element }) {
        super({ element });
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
                    <tr${ idx % 2 ? '' : ' class="even"' }>
                        <td class="type-cell">
                            <i class="fas fa-fw fa-flag"></i>
                            <i class="fas fa-fw fa-user-alt"></i>
                        </td>
                        <td>${ provider.name }</td>
                        <td>${ provider.email }</td>
                        <td>${ provider.phone }</td>
                        <td>${ provider.id }</td>
                        <td><i class="far fa-star"></i> ${ provider.status }</td>
                        <td>
                            <button>CHAT</button>
                            <button>CALL</button>
                            <button><i class="fas fa-ellipsis-v"></i></button>
                        </td>
                    </tr>
                `).join('') }
                </tbody>
            </table>
        `;
    }

}