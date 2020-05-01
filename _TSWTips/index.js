import {Component} from 'react';
import HookStore from '@Core/HookStore';

export class _TSWTips extends Component {

    // We don't need _TSWSearchAndReplace but we do need to fix internal links
    fixInternalLinks = content => {
        let tswAnchorRegex = /(\S*?)href=(["'])(http:\/\/|https:\/\/)(thesmartwallet\.com)\1/gi;
        content = content.replace(tswAnchorRegex, `href="${window.location.protocol}//${window.location.host}/posts`);
        return content;
    }

    componentDidMount(){
        // Enqueue the stylesheet using its public location
        HookStore.doAction('enqueue_styles', 'tswtips', `${process.env.PUBLIC_URL}/styles/tsw-tips.css`, '1.0', true);

        HookStore.addFilter( 'the_content', 'tswtips', this.fixInternalLinks, 1 );
    }

    render(){
        return(null);
    }
}
