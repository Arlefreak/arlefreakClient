import React from 'react';
import PropTypes from 'prop-types';

const Subscribe = () => {
    return (
        <div id="mc_embed_signup" className="subscribe-form">
            <form action="//ellugar.us10.list-manage.com/subscribe/post?u=3d6bfe919b1589eeacd4b646e&amp;id=0d53f511b1" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" novalidate>
                <input type="email" name="EMAIL" className="required email" placeholder="email" id="mce-EMAIL"/>
                <div 
                    className="hidden"
                    aria-hidden="true">
                    <input type="text" name="b_3d6bfe919b1589eeacd4b646e_0d53f511b1" tabIndex="-1" value="" />
                </div>
                <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" />
            </form>
        </div>
    );
};

export default Subscribe;
