import React, { PropTypes } from 'react';
import Loading from './loading.jsx';
import Remarkable from 'remarkable';

const Single = ({ 
    item,
}) => {
    var md = new Remarkable();
    var mdr = md.render(item.text);
    return(
        <section>
            { item.dateCreated && 
                <div className="date-container">
                    <span className="date">{ item.dateCreated } |</span> 
                    <span className="date"> { item.dateUpdated }</span>
                </div>
            }
            <div className="markdown" dangerouslySetInnerHTML={{ __html: mdr }}/>
        </section>
    );
};

Single.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired
};
export default Single;
