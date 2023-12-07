decrypt = (e) => {
	return self.atob((self.atob(e)).split('##')[0])
}
connectShow = (i) => {
	const e = i.dataset.connect;
	i.innerHTML = '<strong>'+decrypt(e)+'</strong>';
}
buyGo = (i) => {
	const e = i.dataset.shop;
	window.location.href = decrypt(e);
}
reload = () => {
	window.location.reload();
}
