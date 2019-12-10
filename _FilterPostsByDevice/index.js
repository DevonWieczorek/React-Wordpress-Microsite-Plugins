import {Component} from 'react';
import queryString from 'query-string';
import HookStore from '@Core/HookStore';

export class _FilterPostsByDevice extends Component {

    filter = (endpoint) => {
        const IOS_ID = 107;
        const ANDROID_ID = 104;
        let base = endpoint.split('?')[0];
        let query = '?' + endpoint.split('?')[1];
        let queryObject = queryString.parse(query);
        let is_iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.userAgent);
        let excludeID = (is_iOS) ? ANDROID_ID : IOS_ID;

        queryObject.tags_exclude = excludeID;
        let updatedQueryString = queryString.stringify(queryObject, {encode: false});

        return base + '?' + updatedQueryString;
    }

    componentDidMount(){
        HookStore.addFilter( 'get_posts', 'FilterPostsByDevice', this.filter, 10 );
    }

    render(){
        return(null);
    }
}
