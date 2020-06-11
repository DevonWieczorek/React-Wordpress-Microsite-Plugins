import {Component} from 'react';
import HookStore from '@Core/HookStore';

export class _IgnoreHiddenPostsOnFeeds extends Component {

    ignoreHiddenPosts = endpoint => {
        const MICROSITE_NON_FEED = 1448;
        let ignore = [MICROSITE_NON_FEED];

        let url = new URL(endpoint);
        let tagsExclude = url.searchParams.get('tags_exclude').split(',');
        if(tagsExclude) ignore = ignore.concat(tagsExclude);
        url.searchParams.set('tags_exclude', ignore.join(','));

        return url.href;
    }

    componentDidMount(){
        HookStore.addFilter( 'get_posts', 'ignoreHiddenPostsOnFeeds', this.ignoreHiddenPosts, 10 );
    }

    render(){
        return(null);
    }
}
