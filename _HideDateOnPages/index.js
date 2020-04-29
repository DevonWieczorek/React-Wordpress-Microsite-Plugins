import React from 'react';

export const hideDate = () => {
    const n = process.env;
    const pages = [n.REACT_APP_DEFAULT_PRIVACY_POLICY_ID, n.REACT_APP_DEFAULT_TERMS_CONDITIONS_ID];
    const selectors = pages.map(id => `#post-${id} .post-date`);
    const style = `${selectors.join(',')}{ display: none; }`;
    return (
        <style type="text/css">{style}</style>
    )
}
