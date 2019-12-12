import {Component} from 'react';
import HookStore from '@Core/HookStore';

export class _QueryStrings extends Component {

    callExecuteQueryStrings = () => {
        if(window.executeQueryStrings){
            window.executeQueryStrings();
        }
        else{
            console.warn('executeQueryStrings is undefined.');
        }
    }

    componentDidMount(){
        // Enqueue the script using it's public location
        HookStore.doAction('enqueue_scripts', 'executeQueryStrings', `${process.env.PUBLIC_URL}/scripts/execute-querystrings.js`, '1.0', true);

        // Wait for everything to load before calling our function
        HookStore.addAction('window_loaded', 'QueryStrings', this.callExecuteQueryStrings);

        // Failsafe for feeds & siderail links
        HookStore.addFilter( 'post_slug', 'QueryStrings', (slug) => (slug  + window.location.search), 10 );
    }

    render(){
        return(null);
    }
}