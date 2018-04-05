import { connect } from 'react-redux';
import { addTagFilter, clearTagFilter } from '../../actions/tag_filter_actions';
import { apiFetchIfNeeded } from '../../actions/api_actions';
import { filterItems } from '../../actions/items_actions';
import FilterList from '../../components/filter__list';

const mapStateToProps = (state, ownProps) => {
  const { apiCalls, tagFilter } = state;

  const { isFetching, lastUpdated, items: items } = ownProps.tags || {
    isFetching: true,
    items: [],
  };

  let active = [];
  let activeObjs = [];

  activeObjs.length = 0;
  active.length = 0;

  let allActive = tagFilter.length <= 0 ? true : false;

  if (items.length > 0) {
    for (var i = 0; i < items.length; i++) {
      let tag = {
        tag_id: items[i].tag_id,
        active: false,
      };
      for (var j = 0; j < tagFilter.length; j++) {
        if (items[i].tag_id === tagFilter[j].tag_id) {
          tag.active = true;
          continue;
        }
      }
      active.push(tag.active);
      activeObjs.push(tag);
    }
  }

  return {
    items: items,
    isFetching,
    lastUpdated,
    active,
    allActive,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  dispatch(apiFetchIfNeeded('portfolio/projectTags'));
  return {
    onClick: (tag_id, name) => {
      dispatch(addTagFilter(tag_id, name));
      dispatch(filterItems());
    },

    clearAll: () => {
      dispatch(clearTagFilter());
      dispatch(filterItems());
    },
  };
};

const ProjectFilterTag = connect(mapStateToProps, mapDispatchToProps)(
  FilterList
);

export default ProjectFilterTag;
