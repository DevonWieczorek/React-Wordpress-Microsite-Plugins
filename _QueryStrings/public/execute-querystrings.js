let ckcount = 0;
let lmcount = 0;
let tunecount = 0;
const url = window.location.href;

const GP = (loc, param, returnKeyValuePair) => {
	if (param.length === 0) return '';
	let regex = '[?&]' + param.toLowerCase() + '=([^&#]*)';
	let results = (new RegExp(regex)).exec(loc.toLowerCase());
	if (results && !returnKeyValuePair) return results[1].trim();
	if (results && returnKeyValuePair) return ("&" + param + "=" + results[1]).trim();
	return '';
}

let s1 = GP(url, "utm_campaign") || GP(url, "subaff1");
let s2 = GP(url, "utm_source") || GP(url, "subaff2") || localStorage.getItem("subaff2") || "null";
let s3 = window['postID'] || "";
let s4 = GP(url, "gclid") || GP(url, "subaff4");
let s5 = "";
let ranSiteID = GP(url, "ranSiteID");

// TODO: find out if we still need this
const fireClickPixels = () => console.warn('Need to implement fireClickPixels.')

const CakeLink = (link, medium, ranSiteID, s1, s2, s3, s4, s5) => {
	let cakeqs = "";

	cakeqs += (s1 === "" ? "&s1=null" : "&s1=f" + s1) + (medium !== "" ? "$" + medium : "");
	cakeqs += (s2 === "" ? "" : "&s2=" + (ranSiteID || s2));
	cakeqs += (s3 === "" ? "" : "&s3=" + s3);
	cakeqs += (s4 === "" ? "" : "&s4=" + s4);
	cakeqs += (s5 === "" ? "" : "&s5=" + s5);

	if(link.href.toLowerCase().indexOf(cakeqs) === -1){
		ckcount += 1;
		link.target = "_blank";
		link.href = link.href.replace('&s1=', '');
		link.href += cakeqs;
		link.setAttribute('data-position', ckcount);


		link.onclick = function (e) {
			try {
				fireClickPixels(this);
			} catch (ex) {
				console.log("Error in click event");
				console.log(ex);
			}
		};
	}

	return link;
}

const TuneLink = (link, medium, ranSiteID, s1, s2, s3, s4, s5) => {
	let tuneqs = "";

	tuneqs += (s1 === "" ? "&aff_sub=null" : "&aff_sub=f" + s1) + (medium !== "" ? "$" + medium : "");
	tuneqs += (s2 === "" ? "" : "&aff_sub2=" + (ranSiteID || s2));
	tuneqs += (s3 === "" ? "" : "&aff_sub3=" + s3);
	tuneqs += (s4 === "" ? "" : "&aff_sub4=" + s4);
	tuneqs += (s5 === "" ? "" : "&aff_sub5=" + s5);

	if(link.href.toLowerCase().indexOf(tuneqs) === -1){
		tunecount += 1;
		link.target = "_blank";
		link.href = link.href.replace('&aff_sub=', '');
		link.href += tuneqs;
		link.setAttribute('data-position', ckcount);


		link.onclick = function (e) {
			try {
				fireClickPixels(this);
			} catch (ex) {
				console.log("Error in click event");
				console.log(ex);
			}
		};
	}

	return link;
}

const LeadManagerLink = (link, s1, s2, s3, s4, s5) => {
    let lmqs = "";

	lmqs += GP(url, "affsecid", true);
	lmqs += (s1 === "" ? "" : "&subaff1=" + s1);
	lmqs += (s2 === "" ? "" : "&subaff2=" + s2);
	lmqs += (s3 === "" ? "" : "&subaff3=" + s3);
	lmqs += (s4 === "" ? "" : "&subaff4=" + s4);
	lmqs += (s5 === "" ? "" : "&subaff5=" + s5);

	if(link.href.toLowerCase().indexOf(lmqs)){
		lmcount += 1;
		link.target = "_blank";
		link.href += lmqs;
	}

	return link;
}

const ThroughLink = (link, s1, s2, s4, medium) => {
    let throughqs = "";

	throughqs += (s1 === "" ? "" : "&utm_campaign=o" + (s1.toLowerCase().charAt(0) === "o" ? s1.split("o")[1] : s1));

	throughqs += (s2 === "" ? "" : "&utm_source=o" + (s2.toLowerCase().charAt(0) === "o" ? s2.split("o")[1] : s2));

	throughqs += (s4 === "" ? "" : "&gclid=o" + (s4.toLowerCase().charAt(0) === "o" ? s4.split("o")[1] : s4));

	throughqs += (medium === "" ? "" : "&utm_medium=o" + (medium.toLowerCase().charAt(0) === "o" ? medium.split("o")[1] : medium));

	if(link.href.toLowerCase().indexOf(throughqs) === -1){
		if (link.href.indexOf('articleid') > -1){
			link.href += "&utm_content=" + GP(link.href, "articleid");
			link.href += throughqs;
		}
		else{
			link.href += throughqs;
		}
	}

	return link;
}

const executeQueryStrings = () => {
    const links = document.getElementsByTagName('a');
    let medium = (GP(url, "utm_medium") || GP(url, "subaff5"));

    ckcount = 0;
    lmcount = 0;
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
