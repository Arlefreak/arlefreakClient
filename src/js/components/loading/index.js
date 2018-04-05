import React from 'react';

class Loading extends React.Component {
    render() {
        return (
            <div className="spinner-wrapper">
                <div className="sk-spinner sk-spinner-pulse"></div>
            </div>
        );
    }
}

export default Loading;
