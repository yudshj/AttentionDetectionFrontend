import './App.css';
import React from 'react';
import { PersonList } from "./PersonList";
import {v4} from "uuid";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {name: "", ip: "", port: 0, items: []}

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleIPChange = this.handleIPChange.bind(this);
        this.handlePortChange = this.handlePortChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const newPersonItem = {
            name: this.state.name,
            ip: this.state.ip,
            port: this.state.port,
            uuid: v4()
        };
        this.setState({items: this.state.items.concat(newPersonItem)})
    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    handleIPChange(e) {
        this.setState({ip: e.target.value})
    }

    handlePortChange(e) {
        this.setState({port: e.target.value})
    }

    render() {
        return (
            <div className="App">
                {/* <DynamicChart working={true}/> */}
                <form onSubmit={this.handleSubmit}>
                    <table>
                        <tbody>
                        <tr>
                            <td>Name:</td>
                            <td><input type="text" name="name" onChange={this.handleNameChange}/></td>
                        </tr>
                        <tr>
                            <td>IP:</td>
                            <td><input type="text" name="ipaddr" onChange={this.handleIPChange}/></td>
                        </tr>
                        <tr>
                            <td>Port:</td>
                            <td><input type="number" name="port" onChange={this.handlePortChange}/></td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                {this.state.name} : {this.state.ip} : {this.state.port}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button id="add-ip-port-btn">Add</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
                <PersonList items={this.state.items}/>
            </div>
        );
    }
}

export default App;
