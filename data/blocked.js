function getSearchParameters() {
	const prmstr = window.location.search.substr(1);
	return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
	const params = {};
	const prmarr = prmstr.split("&");
	for ( var i = 0; i < prmarr.length; i++) {
		const tmparr = prmarr[i].split("=");
		params[tmparr[0]] = tmparr[1];
	}
	return params;
}

function onLoad() {
	const params = getSearchParameters();
}