import React from 'react';
import fetch from 'isomorphic-fetch';
import Loading from './loading.jsx';
import constants from './constants.js';

const apiURL = constants.APIURL;

class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gallery: []
        };
    }

    componentDidMount() {
        fetch(apiURL + 'images/?project__id=' + this.props.id + '&imgType=gal')
        .then((response) => {
            return response.json();
        })
        .then((gallery) => {
            this.setState({
                gallery: gallery
            });
        });
    }

    render() {
        console.log(this.state.gallery);
        if (this.state.gallery !== undefined) {
            if(this.state.gallery.length > 0){
                return(
                    <section className="gallery">
                        {
                            this.state.gallery.map((single, index) => {
                                console.log(single);
                                return (
                                    <img key={index} src={single.image}/>
                                    );
                            })
                        }
                    </section>
                );
            }else{
                return false; 
            }
        } else {
            return React.createElement(Loading);
        }
    }
}

export default Project;
