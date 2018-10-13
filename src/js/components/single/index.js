import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../loading';
import Remarkable from 'remarkable';

const Single = ({ item }) => {
  var md = new Remarkable();
  var text = item.text || item.description;
  var mdr = md.render(text);
  return (
    <section>
      {item.dateCreated != null && (
        <div className="date-container">
          <span className="date">{item.dateCreated} |</span>
          <span className="date"> {item.dateUpdated}</span>
        </div>
      )}
      <div className="markdown" dangerouslySetInnerHTML={{ __html: mdr }} />
    </section>
  );
};

Single.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
export default Single;
