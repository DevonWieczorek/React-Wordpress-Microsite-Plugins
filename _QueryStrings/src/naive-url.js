class NaiveURL extends URL{
    constructor(href){
        super(href);
        this.search = this.search || this._polySearch();
    }

    _polySearch(){
        const search = this.href.split('?')[1];
        return (search) ? search : '';
    }

    static search = (href = this.href) => {
        return (new NaiveURL(href)).search;
    }

    _polyGetSearchParameter(param, href = this.href){
        if(param.length === 0) return '';
        const regex = '[?&]' + param.toLowerCase() + '=([^&#]*)';
        const results = (new RegExp(regex)).exec(href.toLowerCase());
        return (results) ? results[1].trim() : '';
    }

    GetSearchParameter(param, href = this.href){
        if(!!this.searchParams){
            const _param = this.searchParams.get(param);
            return (_param) ? _param : '';
        }
        else{
            return this._polyGetSearchParameter(param, this.href);
        }
    }

    static GetParameter = (param, href = this.href) => {
        return (new NaiveURL(href)).GetSearchParameter(param, href);
    }

    _polySetSearchParameter(param, value, href = this.href){
        if(!value) return '';
        const regex = new RegExp('\\b(' + param + '=).*?(&|#|$)');
        if (href.search(regex) >= 0) {
            return href.replace(regex,'$1' + value + '$2');
        }
        href = href.replace(/[?#]$/,'');
        return href + (href.indexOf('?') > 0 ? '&' : '?') + param + '=' + value;
    }

    SetSearchParameter(param, value = '', href = this.href){
        if(!!this.searchParams){
            this.searchParams.set(param, value);
        }
        else{
            this.href = this._polySetSearchParameter(param, value);
            return this.href;
        }
    }

    static SetParameter = (param, value = '', href = this.href) => {
        let url = new NaiveURL(href);
        url.SetSearchParameter(param, value, href);
        return url.href;
    }

    RemoveSearchParameter(param, href = this.href) {
        if(!param) return href;

        this.href = href
            .replace(new RegExp('[?&]' + param + '=[^&#]*(#.*)?$'), '$1')
            .replace(new RegExp('([?&])' + param + '=[^&]*&'), '$1');
        return this.href;
    }

    static RemoveParameter = (param, href = this.href) => {
        let url = new NaiveURL(href);
        url.RemoveSearchParameter(param, href);
        return url.href;
    }
}

module.exports = NaiveURL;
