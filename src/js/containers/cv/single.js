import { connect } from 'react-redux';
import { apiFetchIfNeeded } from '../../actions/api_actions';
import SingleContainer from '../../components/single__container';

const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;
  const { apiCalls } = state;

  const list = apiCalls['cv/cv'] || {
    isFetching: true,
    items: [],
  };

  let item = {
    id: 0,
    slug,
    sections: [],
  };

  var i = 0;
  for (i; i < list.items.length; i++) {
    if (list.items[i].slug === slug) {
      item = list.items[i];
      break;
    }
  }

  const isFetching = list.isFetching;
  const meta_title = 'Mario Carballo Zama';

  const fullText = item.sections
    .map(elem => {
      return elem.text;
    })
    .join('\n');

  item = {
    id: item.id,
    slug: item.slug,
    text: fullText,
  };

  return {
    id: 'cv',
    title: 'Mario Carballo Zama',
    className: 'cv',
    isFetching,
    item,
    meta_title,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  dispatch(apiFetchIfNeeded('cv/cv'));
  return {};
};

const CvSingle = connect(mapStateToProps, mapDispatchToProps)(SingleContainer);

export default CvSingle;
