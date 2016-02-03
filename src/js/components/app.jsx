import React from 'react';
import Header from './header.jsx';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header></Header>
                {
                }
                <main>
                    <div className="wrapper">
                        { this.props.children }
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
