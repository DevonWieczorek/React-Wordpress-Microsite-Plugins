import {Component} from 'react';
import HookStore from '@Core/HookStore';

export class _TSWTips extends Component {

    componentDidMount(){
        // Enqueue the stylesheet using it's public location
        HookStore.doAction('enqueue_styles', 'tswtips', `${process.env.PUBLIC_URL}/styles/tsw-tips.css`, '1.0', true);
    }

    render(){
        return(null);
    }
}
