import { connect } from 'react-redux';
import SubscribePage from '../../components/subscribe__page';
import { apiFetchIfNeeded } from '../../actions/api_actions';

const mapStateToProps = state => {
  const { apiCalls } = state;
  const config = apiCalls['web_client/config/1/'] || {
    isFetching: true,
    items: {},
  };

  const meta_title = 'Subscribe';
  const meta_description = config.items.subscribeDescription || '';

  return {
    id: 'subscribe',
    isFetching: config.isFetching,
    items: config.items,

    meta_title,
    meta_description,
  };
};

const mapDispatchToProps = dispatch => {
  dispatch(apiFetchIfNeeded('web_client/config/1/'));
  return {};
};

const Home = connect(mapStateToProps, mapDispatchToProps)(SubscribePage);

export default Home;
