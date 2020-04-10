import React, {Component} from 'react';
import HookStore from '@Core/HookStore';

export class _InitTrackersEvent extends Component {

    // Allow other plugins to detect init
    window['init'] = true;

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
        window['init'] = false;
    }

    setEvent = () => {
        if (!this.isSnapchat()) {
            if (window['init']) {
                this.initTrackers();
            }
        }
    	else if (this.isSnapchat()) {
    		jQuery(document).on('touchstart mousemove', function(){
    			if (window['init']) {
    				this.initTrackers();
    				jQuery(document).off('touchstart mousemove');
    			}
    		});
        }
    }

    componentDidMount(){
        this.setEvent();
    }

    render(){
        return(null);
    }
}
