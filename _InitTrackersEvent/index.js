import React, {Component} from 'react';
import HookStore from '@Core/HookStore';

export class _InitTrackersEvent extends Component {

    // Allow other plugins to detect init
    init = true;

    isSnapchat = () => (navigator.userAgent.toLowerCase().indexOf('snapchat') > -1);

    initTrackers = () => {
        // Allow other plugins to create their own initTrackers function
        if(window['initTrackers']){
            window['initTrackers']();
        }
        // Otherwise just fire off the GA event
        else{
            window.dataLayer.push({'event': 'initTrackers'});
        }
        // Prevent firing multiple times
        this.init = false;
    }

    setEvent = () => {
        if (!this.isSnapchat()) {
            if (this.init) {
                HookStore.doAction('initTrackers');
            }
        }
    	else if (this.isSnapchat()) {
    		jQuery(document).on('touchstart mousemove', function(){
    			if (this.init) {
    				HookStore.doAction('initTrackers');
    				jQuery(document).off('touchstart mousemove');
    			}
    		});
        }
    }

    componentDidMount(){
        // Create an event so other plugins can listen for it
        HookStore.addAction('initTrackers', 'InitTrackersEvent', this.initTrackers);

        this.setEvent();
    }

    render(){
        return(null);
    }
}
