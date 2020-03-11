import {Component} from 'react';
import HookStore from '@Core/HookStore';

export class _ProductCards extends Component {

    componentDidMount(){
        // Enqueue the stylesheet using it's public location
        HookStore.doAction('enqueue_styles', 'productCards', `${process.env.PUBLIC_URL}/styles/product-card.css`, '1.0', true);
    }

    render(){
        return(null);
    }
}
