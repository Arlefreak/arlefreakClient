import React, { PropTypes } from 'react';
import Loading from './loading.jsx';
import Id from './id.jsx';

const Page = ({ id, title, isFetching, children }) => {
    if(!isFetching){
        return (
            <article>
                { title != null && 
                    <h2>{title}</h2>
                }
                { children }
                <Id index={id}/>
            </article>
        );
    }else{
        return(
            <article>
                <Loading/>
                <Id index={id}/>
            </article>
        );
    }
};

Page.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
};

export default Page;
