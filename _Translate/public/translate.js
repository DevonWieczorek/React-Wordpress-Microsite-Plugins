function setTranslationEventListener(){
    var translateSelectors = ['a.translate'];

    var languageIDs = {
        'en': 1437,
        'fr': 1438
    };

    var links = document.querySelectorAll(translateSelectors.join(','));

    for(var i = 0; i < links.length; i++){
        links[i].onclick = function(){
            let classList = this.classList.value.split(' ');
            classList.forEach(c => {
                if(languageIDs[c]){
                    localStorage.setItem('preferredLanguage', languageIDs[c]);
                    return;
                }
            });
        }
    }
}
window.setTranslationEventListener = setTranslationEventListener;

window.addEventListener('DOMContentLoaded', window.setTranslationEventListener);
