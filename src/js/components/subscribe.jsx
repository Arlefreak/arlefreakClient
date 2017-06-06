import React from 'react';
import PropTypes from 'prop-types';

const Container = () => {
    return (
        <div className="subscribe-form">
            <form
                action="https://tinyletter.com/afk" 
                method="post"
                target="popupwindow" 
                onSubmit={
                    () => {
                        window.open('https://tinyletter.com/afk', 'popupwindow', 'scrollbars=yes,width=800,height=600');
                        return true;
                    }
                }
            >
                <input type="email" name="email" className="required email" placeholder="email" id="tlemail"/>
                <input type="hidden" value="1" name="embed"/>
                <input type="submit" value="Subscribe" className="button" />
            </form>
        </div>
    );
};

export default Container;



