import {Component} from 'react';
import HookStore from '@Core/HookStore';

export class _TSWSearchAndReplace extends Component {

    replaceContent = (content) => {

        // Clear any references to TSW
        content = content.replace(/the smart wallet/gi, process.env.REACT_APP_DEFAULT_SITENAME);

        // Update internal links
        let tswAnchorRegex = /(\S*?)href=(["'])(http:\/\/|https:\/\/)(thesmartwallet\.com)\1/gi;
        content = content.replace(tswAnchorRegex, `href="${window.location.protocol}//${window.location.host}/posts`);

        // Replace textual representations of thesmartwallet
        const envHost = process.env.REACT_APP_DEFAULT_SITENAME.replace(/ /g, '');
        content = content.replace(/thesmartwallet/gi, envHost);

        // Then we need to put it back for any image src or srcset
        let srcExp = new RegExp(`(src=".*|srcset=".*)${envHost}`, 'g', 'i');
        let hostExp = new RegExp(envHost, 'gi');
        content = content.replace(srcExp, ($1) => $1.replace(hostExp, 'thesmartwallet'));

        // (?<!src=".*) - make sure to not replace image sources
        // Negative lookbehinds not yet supported, although this is the cleaner way to do things vvv
        // content = content.replace(/(?<!src=".*)thesmartwallet/gi, process.env.REACT_APP_DEFAULT_SITENAME.replace(/ /g, ''));

        return content;
    }

    componentDidMount(){
        HookStore.addFilter( 'the_content', 'TSWSearchAndReplace', this.replaceContent, 1 );
    }

    render(){
        return(null);
    }
}
