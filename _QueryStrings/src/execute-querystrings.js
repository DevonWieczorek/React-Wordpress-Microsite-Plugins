const NaiveURL = require('./naive-url');

let ckcount = 0;
let tunecount = 0;

const _URL = new NaiveURL(window.location.href);
const s1 = _URL.GetSearchParameter('utm_campaign') || _URL.GetSearchParameter('subaff1');
const s2 = _URL.GetSearchParameter('utm_source') || _URL.GetSearchParameter('subaff2') || localStorage.getItem("subaff2") || "null";
const s3 = _URL.GetSearchParameter('articleid') || _URL.GetSearchParameter('subaff3');
const s4 = _URL.GetSearchParameter('gclid') || _URL.GetSearchParameter('subaff4');
const s5 = "";
const ranSiteID = _URL.GetSearchParameter('ranSiteID');

// TODO: find out if we still need this
const fireClickPixels = () => console.warn('Need to implement fireClickPixels.');

const CakeLink = function(link, medium, ranSiteID, s1, s2, s3, s4, s5){
	const cakelink = new NaiveURL(link.href);

	// &s1= is trailing on the link
	if(!cakelink.GetSearchParameter('s1')) cakelink.href = cakelink.href.replace('&s1=', '');

	const _s1 = (s1 === '' ? 'null' : 'f' + s1) + (medium !== '' ? '$' + medium : '');
	const _s2 = (ranSiteID) ? ranSiteID : s2;

	if(_s1) cakelink.SetSearchParameter('s1', _s1);
	if(_s2) cakelink.SetSearchParameter('s2', _s2);
	if(s3) cakelink.SetSearchParameter('s3', s3);
	if(s4) cakelink.SetSearchParameter('s4', s4);
	if(s5) cakelink.SetSearchParameter('s5', s5);

	ckcount += 1;
	link.setAttribute('data-position', ckcount);
	link.href = cakelink.href;
	link.target = '_blank';

	link.onclick = function (e) {
		try {
			fireClickPixels(this);
		} catch (ex) {
			console.log("Error in click event");
			console.log(ex);
		}
	};

	return link;
}

const TuneLink = function(link, medium, ranSiteID, s1, s2, s3, s4, s5){
	const tunelink = new NaiveURL(link.href.replace('&aff_sub=', ''));

	// &aff_sub= is trailing on the link
	if(!tunelink.GetSearchParameter('aff_sub')) tunelink.href = tunelink.href.replace('&aff_sub=', '');

	const affsub = (s1 === '' ? 'null' : 'f' + s1) + (medium !== '' ? '$' + medium : '');
	const affsub2 = (ranSiteID) ? ranSiteID : s2;

	if(affsub) tunelink.SetSearchParameter('aff_sub', affsub);
	if(affsub2) tunelink.SetSearchParameter('aff_sub2', affsub2);
	if(s3) tunelink.SetSearchParameter('aff_sub3', s3);
	if(s4) tunelink.SetSearchParameter('aff_sub4', s4);
	if(s5) tunelink.SetSearchParameter('aff_sub5', s5);

	tunecount += 1;
	link.setAttribute('data-position', tunecount);
	link.href = tunelink.href;
	link.target = '_blank';

	link.onclick = function (e) {
		try {
			fireClickPixels(this);
		} catch (ex) {
			console.log("Error in click event");
			console.log(ex);
		}
	};

	return link;
}

const LeadManagerLink = function(link, s1, s2, s3, s4, s5){
	const lmlink = new NaiveURL(link);
	const affsecid = NaiveURL.GetParameter('affsecid', window.location.href);

	if(affsecid) lmlink.SetSearchParameter('affsecid', affsecid);
	if(s1) lmlink.SetSearchParameter('s1', s1);
	if(s2) lmlink.SetSearchParameter('s2', s2);
	if(s3) lmlink.SetSearchParameter('s3', s3);
	if(s4) lmlink.SetSearchParameter('s4', s4);
	if(s5) lmlink.SetSearchParameter('s5', s5);

	link.target = "_blank";
	link.href = lmlink.href;
	return link;
}

const ThroughLink = function(link, s1, s2, s4, medium){
	const throughlink = new NaiveURL(link);

	const prepend_o = (val) => (val.toLowerCase().charAt(0) === "o" ? val : 'o' + val);

	if(s1) throughlink.SetSearchParameter('utm_campaign', prepend_o(s1));
	if(s2) throughlink.SetSearchParameter('utm_source', prepend_o(s2));
	if(s4) throughlink.SetSearchParameter('gclid', prepend_o(s4));
	if(medium) throughlink.SetSearchParameter('utm_medium', prepend_o(medium));

	// Set utm_content for internal article links
	if (link.href.indexOf('articleid') > -1){
		const articleid = window['articleid'] || NaiveURL.GetParameter('articleid', window.location.href);
		throughlink.SetSearchParameter('utm_content', articleid);
	}

	link.href = throughlink.href;
	return link;
}

const executeQueryStrings = () => {
    const links = document.getElementsByTagName('a');
	const medium = _URL.GetSearchParameter('utm_medium') || _URL.GetSearchParameter('subaff5');

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
