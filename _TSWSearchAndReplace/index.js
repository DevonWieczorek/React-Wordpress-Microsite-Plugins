import {Component} from 'react';
import HookStore from '@Core/HookStore';

export class _TSWSearchAndReplace extends Component {

    replaceContent = (content) => {
        // TSW lazyloads images, we don't
        content = content.replace(/data-src/g, 'src');

        // Clear any references to TSW
        content = content.replace(/the smart wallet/gi, process.env.REACT_APP_DEFAULT_SITENAME);
        // (?<!src=".*) - make sure to not replace image sources
        content = content.replace(/(?<!src=".*)thesmartwallet/gi, process.env.REACT_APP_DEFAULT_SITENAME.replace(/ /g, ''));

        // Replace contact-us with mailto: link
        let tswContactRegex = /(http:\/\/|https:\/\/)(thesmartwallet\.com\/contact-us)/gi;
        // strip out www. and query strings
        let mailto = `mailto:info@${window.location.host.replace('www.', '').split('?')[0]}`;
        content = content.replace(tswContactRegex, mailto);

        // Update internal links
        let tswAnchorRegex = /(\S*?)href=(["'])(http:\/\/|https:\/\/)(thesmartwallet\.com)\1/gi;
        content = content.replace(tswAnchorRegex, `href="${window.location.host}/posts`);

        return content;
    }

    componentDidMount(){
        HookStore.addFilter( 'the_content', 'Post', this.replaceContent, 1 );
    }

    render(){
        return(null);
    }
}
