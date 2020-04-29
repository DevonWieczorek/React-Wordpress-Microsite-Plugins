import {Component} from 'react';
import HookStore from '@Core/HookStore';

export class _ReplaceContactWithMailto extends Component {

    // eslint-disable-next-line no-useless-escape
    regexEscape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    // eslint-disable-next-line no-useless-escape
    hrefRegExp = (href, flags = '') => new RegExp('href\\s*=\\s*"(.{0,}?)' + this.regexEscape(href) + '(.{0,}?)"', flags);

    // Replace contact-us with mailto: link
    replaceContact = (content) => {

        // TSW contact us link
        const tswContactRegex = this.hrefRegExp('thesmartwallet.com/contact-us', 'gi');

        // strip out www. and query strings from host
        const urlHost = window.location.host.replace('www.', '').split('?')[0];
        const urlHostRegex = this.hrefRegExp(`${urlHost}/posts/contact-us`, 'gi');

        // Replace both tsw and this site, as to not be dependent on _TSWSearchAndReplace
        const mailto = `href="mailto:info@${urlHost}"`;
        content = content.replace(tswContactRegex, mailto);
        content = content.replace(urlHostRegex, mailto);

        return content;
    }

    componentDidMount(){
        // Wait for _TSWSearchAndReplace to run, if active
        HookStore.addFilter( 'the_content', 'ReplaceContactWithMailto', this.replaceContact, 99 );
    }

    render(){
        return(null);
    }
}
