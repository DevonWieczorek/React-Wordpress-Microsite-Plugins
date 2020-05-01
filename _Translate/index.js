import {Component} from 'react';
import HookStore from '@Core/HookStore';

export class _Translate extends Component {

    languageIDs = {
        'en': 1437,
        'fr': 1438
    };

    setTranslationEvent = () => {
        if(window.setTranslationEventListener){
            window.setTranslationEventListener();
        }
    }

    filterPostsByLanguage = endpoint => {
        let url = new URL(endpoint);
        const ids = this.languageIDs;
        const lang = parseInt(localStorage.getItem('preferredLanguage')) || ids.en;
        const ignore = Object.values(ids).filter(i => i !== lang);

        let languages = Object.values(ids);
        languages.pop(languages.indexOf(lang));

        let tags = url.searchParams.get('tags').split(',');
        tags.push(lang);

        let tagsExclude = url.searchParams.get('tags_exclude').split(',');
        if(tagsExclude) ignore.concat(tagsExclude);

        url.searchParams.set('tags', tags.join(','));
        url.searchParams.set('tags_exclude', ignore.join(','));

        return url.href;
    }

    componentDidMount(){
        // Enqueue the script using it's public location
        HookStore.doAction('enqueue_scripts', 'translate', `${process.env.PUBLIC_URL}/scripts/translate.js`, '1.0', true);

        HookStore.addAction('window_loaded', 'translate', this.setTranslationEvent);

        HookStore.addFilter('get_posts', 'translate', this.filterPostsByLanguage);
    }

    render(){
        return(null);
    }
}
