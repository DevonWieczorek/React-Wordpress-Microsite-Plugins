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
        HookStore.doAction('enqueue_scripts', 'tswPolyfills', `${process.env.PUBLIC_URL}/scripts/polyfiller.js`, '2.0');
        HookStore.doAction('enqueue_scripts', 'executeQueryStrings', `${process.env.PUBLIC_URL}/scripts/execute-querystrings.js`, '3.0', true);

        // Wait for everything to load before calling our function
        HookStore.addAction('window_loaded', 'QueryStrings', this.callExecuteQueryStrings);

        // Expose articleid for tracking
        HookStore.addFilter('the_post', 'QueryStrings', (post) => {
            let _url = new URL(window.location.href);

            _url.searchParams.set('articleid', post.id);
            window.history.replaceState({}, document.title, _url);
            window['articleid'] = post.id;

            if(window['executeQueryStrings']) window['executeQueryStrings']();

            return post;
        });

        // Failsafe for feeds & siderail links
        HookStore.addFilter( 'post_slug', 'QueryStrings', (slug) => {
            this.callExecuteQueryStrings();
            return slug  + window.location.search;
        }, 10 );
    }

    render(){
        return(null);
    }
}
