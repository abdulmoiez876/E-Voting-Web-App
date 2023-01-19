import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-dark bg-dark justify-between">
                        <div><a href="/" className="navbar-brand">E-Voting App</a></div>
                        <button type='button' className="btn btn-danger">Logout</button>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
