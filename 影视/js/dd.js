function getSize(bytesLen) {
	let unitCount = 0;
	let units = ['Bytes', 'KB', 'MB', 'GB'];
	while (bytesLen > 1024) {
		bytesLen /= 1024;
		unitCount++;
	}
	
	return bytesLen.toFixed(2) + units[unitCount];
}
//github API地址: api.github.com 镜像地址: g-api.nite07.org
(async () => {
	let res1, res2;
	try {
		res1 = (
			await axios.get('https://g-api.nite07.org/repos/fongmi/TV/contents/release?ref=dev')
		).data.filter(
			(item) =>
				item.name.endsWith('.apk') &&
				item.name !== 'mobile-java.apk' &&
				item.name !== 'mobile-python.apk' &&
				item.name !== 'leanback-java.apk' &&
				item.name !== 'leanback-python.apk'
		);
		res2 = (
			await axios.get(
				'https://g-api.nite07.org/repos/fongmi/TV/contents/release?ref=kitkat')
		).data.filter(
			(item) =>
				item.name.endsWith('.apk')
         );
	} catch (err) {
		Swal.fire({
			icon: 'error',
			title: '下载资源请求失败',
			showConfirmButton: false,
			timer: 1000,
		});
	}
	let res = res1.concat(res2);
	let downloadList = document.querySelector('#download ul');
	res.forEach((item) => {
		let liItem = `<li
        class="rounded-lg pl-2 pt-1 hover:bg-gray-200 mb-3 pb-1 border-b text-blue-400 hover:text-blue-800 transition-all duration-100 grid grid-cols-4">
        <a class="col-span-2" href="https://ghproxy.com/${item.download_url}">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
            </svg>
                ${item.name}
            </span>
        </a>
        <span class="mr-10">${getSize(item.size)}</span>
        <span>
            <a class="col-span-3" href="${item.download_url}" download>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
            </svg>
            </a>
        </span>
        </li>`;
		downloadList.innerHTML += liItem;
	});
})();
