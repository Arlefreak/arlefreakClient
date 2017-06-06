import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PageComponent from '../components/page.jsx';
import { apiFetchIfNeeded } from '../actions/api_actions';

const mapStateToProps = (state, ownProps) => {
    const { apiCalls } = state;

    const config = apiCalls['web_client/config/1/'] || {
        isFetching: true,
        items: {},
    };

    const meta_url = ownProps.meta_url || `https://ellugar.co${ ownProps.location.pathname }` || '';
    const meta_title = ownProps.meta_title || config.items.title || 'ellugar.co';
    const meta_description = ownProps.meta_description || config.items.description || '';
    const meta_preview = ownProps.meta_preview || config.items.preview || '';

    return {
        meta_url,
        meta_title,
        meta_description,
        meta_preview,
    };
};

const mapDispatchToProps = (dispatch) => {
    dispatch(apiFetchIfNeeded('web_client/config/1/'));
    return {};
};

const Page = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PageComponent));

export default Page;
