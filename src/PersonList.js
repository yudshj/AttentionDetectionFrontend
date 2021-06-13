import React from 'react';
import { Person } from './Person';


export class PersonList extends React.Component {
    render() {
        return (
            <div id="PersonList">
                {this.props.items.map(item => (
                    <Person key={item.uuid} uuid={item.uuid} name={item.name} ip={item.ip} port={item.port} />
                ))}
            </div>
        );
    }
}
