import React from 'react';

class Loading extends React.Component {
    render() {
        return (
            <article>
                <h2>About</h2>
                <p>
                    I'm Mario Carballo Zama a game and full web stack developer with great learning skills and a keen eye for UI UX,
                    I am passionate about games with good visual style and simple and fun mechanics,
                    I'm always looking for new technologies to learn and new projects to implement them.
                </p>
                <img className="index hideMobile" src="img/a.svg" alt="Icono"/>
            </article>
        );
    }
}

export default Loading;
