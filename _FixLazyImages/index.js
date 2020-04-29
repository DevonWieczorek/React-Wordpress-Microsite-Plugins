import {Component} from 'react';
import HookStore from '@Core/HookStore';

export class _FixLazyImages extends Component {

    // TSW lazyloads images, we don't
    restoreImgSrc = content =>  content.replace(/data-src/g, 'src');

    componentDidMount(){
        HookStore.addFilter( 'the_content', 'FixLazyImages', this.restoreImgSrc, 1 );
    }

    render(){
        return(null);
    }
}
