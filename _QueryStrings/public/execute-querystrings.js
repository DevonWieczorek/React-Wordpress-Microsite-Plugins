let ckcount = 0;
let tunecount = 0;

const _URL = new URL(window.location.href);
const s1 = _URL.searchParams.get('utm_campaign') || _URL.searchParams.get('subaff1');
const s2 = _URL.searchParams.get('utm_source') || _URL.searchParams.get('subaff2') || localStorage.getItem("subaff2") || "null";
let s3 = _URL.searchParams.get('articleid') || window['articleid'] || _URL.searchParams.get('subaff3');
const s4 = _URL.searchParams.get('fbclid') || _URL.searchParams.get('gclid') || _URL.searchParams.get('subaff4') || '';
// const s4Type = s4Type();
const s5 = "";
const ranSiteID = _URL.searchParams.get('ranSiteID');

// Some sites use this, others don't
if(!window.fireClickPixels){
	window.fireClickPixels = (scope) => console.warn('Need to implement fireClickPixels.');
}

const CakeLink = function(link, medium, ranSiteID, s1, s2, s3, s4, s5){
	const cakelink = new URL(link.href);

	// &s1= is trailing on the link
	if(!cakelink.searchParams.get('s1')) cakelink.href = cakelink.href.replace('&s1=', '');

	const _s1 = (s1 === '' ? 'null' : 'f' + s1) + (medium !== '' ? '$' + medium : '');
	const _s2 = (ranSiteID) ? ranSiteID : s2;

	if(_s1) cakelink.searchParams.set('s1', _s1);
	if(_s2) cakelink.searchParams.set('s2', _s2);
	if(s3) cakelink.searchParams.set('s3', s3);
	// if(s4) cakelink.searchParams.set('s4', s4);
	if(s5) cakelink.searchParams.set('s5', s5);

	link.href = cakelink.href;
	link.target = '_blank';
	if(!link.hasAttribute('data-position')){
		ckcount += 1;
		link.setAttribute('data-position', ckcount);
	}
	link.onclick = function (e) {
		try {
			window.fireClickPixels(this);
		} catch (ex) {
			console.log("Error in click event");
			console.log(ex);
		}
	};

	return link;
}

const TuneLink = function(link, medium, ranSiteID, s1, s2, s3, s4, s5){
	const tunelink = new URL(link.href);

	// &aff_sub= is trailing on the link
	if(!tunelink.searchParams.get('aff_sub')) tunelink.href = tunelink.href.replace('&aff_sub=', '');

	const affsub = (s1 === '' ? 'null' : 'f' + s1) + (medium !== '' ? '$' + medium : '');
	const affsub2 = (ranSiteID) ? ranSiteID : s2;

	if(affsub) tunelink.searchParams.set('aff_sub', affsub);
	if(affsub2) tunelink.searchParams.set('aff_sub2', affsub2);
	if(s3) tunelink.searchParams.set('aff_sub3', s3);
	// if(s4) tunelink.searchParams.set('aff_sub4', s4);
	if(s5) tunelink.searchParams.set('aff_sub5', s5);

	link.href = tunelink.href;
	link.target = '_blank';
	if(!link.hasAttribute('data-position')){
		tunecount += 1;
		link.setAttribute('data-position', tunecount);
	}
	link.onclick = function (e) {
		try {
			window.fireClickPixels(this);
		} catch (ex) {
			console.log("Error in click event");
			console.log(ex);
		}
	};

	return link;
}

const LeadManagerLink = function(link, s1, s2, s3, s4, s5){
	const lmlink = new URL(link.href);
	const affsecid = new URL(window.location.href).searchParams.get('affsecid');

	if(affsecid) lmlink.searchParams.set('affsecid', affsecid);
	if(s1) lmlink.searchParams.set('s1', s1);
	if(s2) lmlink.searchParams.set('s2', s2);
	if(s3) lmlink.searchParams.set('s3', s3);
	// if(s4) lmlink.searchParams.set('s4', s4);
	if(s5) lmlink.searchParams.set('s5', s5);

	link.target = "_blank";
	link.href = lmlink.href;
	return link;
}

const ThroughLink = function(link, s1, s2, s4, medium){
	const throughlink = new URL(link.href);
	const signup = new URL(window.location.href).searchParams.get('signup');

	const prepend_o = (val) => (val.toLowerCase().charAt(0) === "o" ? val : 'o' + val);

	if(s1) throughlink.searchParams.set('utm_campaign', prepend_o(s1));
	if(s2) throughlink.searchParams.set('utm_source', prepend_o(s2));
	// if(s4) throughlink.searchParams.set(s4Type, prepend_o(s4));
	if(medium) throughlink.searchParams.set('utm_medium', prepend_o(medium));
	if(signup && signup === 'false') throughlink.searchParams.set('signup', 'false');

	// Set utm_content for internal article links
	if (link.href.indexOf('articleid') > -1){
		const articleid = window['articleid'] || new URL(window.location.href).searchParams.get('articleid');
		throughlink.searchParams.set('utm_content', articleid);
	}

	link.href = throughlink.href;
	return link;
}

const executeQueryStrings = () => {
    const links = document.getElementsByTagName('a');
	const medium = _URL.searchParams.get('utm_medium') || _URL.searchParams.get('subaff5');

	// Bug fix - search for s3 each time executeQueryStrings gets called (resolve race condition)
	s3 = _URL.searchParams.get('articleid') || window['articleid'] || _URL.searchParams.get('subaff3');

	// Reset count for accurate data-position
    ckcount = 0;
	tunecount = 0;

    for (let i = 0; i < links.length; i++) {
        links[i].href += (links[i].href.indexOf("?") > -1 ? "" : "?1=1");

		if(links[i].className.indexOf('ck-link') > -1){
			CakeLink(links[i], medium, ranSiteID, s1, s2, s3, s4, s5);
		}
		else if(links[i].className.indexOf('tune') > -1){
			TuneLink(links[i], medium, ranSiteID, s1, s2, s3, s4, s5);
		}
		else if (links[i].className.indexOf('lm-link') > -1){
			LeadManagerLink(links[i], s1, s2, s3, s4, s5);
		}
		else{
			ThroughLink(links[i], s1, s2, s4, medium);
		}
    }
}
window.executeQueryStrings = executeQueryStrings;

window.addEventListener('DOMContentLoaded', (event) => {
    window.executeQueryStrings();
});
