import {Component} from 'react';
import HookStore from '@Core/HookStore';

export class _ReplaceContactWithMailto extends Component {

    // Replace contact-us with mailto: link
    replaceContact = (content) => {

        // TSW contact us link
        const tswContactRegex = /(http:\/\/|https:\/\/)(thesmartwallet\.com\/contact-us)/gi;
        const tswContactSearchRegex = new RegExp(`(http://|https://)(thesmartwallet.com/contact-us${window.location.search})`);

        // strip out www. and query strings from host
        const urlHost = window.location.host.replace('www.', '').split('?')[0];
        const urlHostRegex = new RegExp(`${window.location.protocol}//${urlHost}/posts/contact-us`, 'gi');
        const urlHostSearchRegex = new RegExp(`${window.location.protocol}//${urlHost}/posts/contact-us${window.location.search}`, 'gi');

        // Replace both tsw and this site, as to not be dependent on _TSWSearchAndReplace
        const mailto = `mailto:info@${urlHost}`;
        content = content.replace(tswContactSearchRegex, mailto);
        content = content.replace(tswContactRegex, mailto);
        content = content.replace(urlHostSearchRegex, mailto);
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
