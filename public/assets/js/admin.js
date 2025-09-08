(function(){
	var ADMIN_ID='3248882548913828704095180';
	var ADMIN_PASS='+2tDk*dm]=mS@3~;[GQ22fffc';
	function $(s, r){return (r||document).querySelector(s)}
	function toast(m){alert(m)}
	function setYear(){var y=$('#year'); if(y) y.textContent=String(new Date().getFullYear())}
	async function api(path, opts){
		opts = opts||{}; opts.headers = Object.assign({}, opts.headers||{}, {'x-admin-id': ADMIN_ID, 'x-admin-pass': ADMIN_PASS, 'content-type':'application/json'});
		var res = await fetch(path, opts);
		if(!res.ok) throw new Error('API error');
		return res.json();
	}
	async function refresh(){
		var list = $('#productList'); if(!list) return;
		var res = await fetch('/api/products');
		var data = await res.json();
		var items = data.items||[];
		var card = function(p){return `<div class=\"card\">\n\t\t<img src=\"${p.imageUrl}\" class=\"thumb\" />\n\t\t<div class=\"title\">${p.title}</div>\n\t\t<div class=\"desc\">${p.description}</div>\n\t\t<div class=\"row\" style=\"justify-content:space-between;align-items:center\">\n\t\t\t<span class=\"price\">$${Number(p.price||0).toFixed(2)}</span>\n\t\t\t<button class=\"btn\" data-edit=\"${p.id}\">Edit</button>\n\t\t</div>\n\t</div>`}
		list.innerHTML = items.map(card).join('');
		list.querySelectorAll('[data-edit]').forEach(function(btn){btn.addEventListener('click', function(){loadIntoForm(btn.getAttribute('data-edit'))})});
	}
	async function loadIntoForm(id){
		var res = await fetch('/api/products'); var data = await res.json();
		var p = (data.items||[]).find(function(x){return x.id===id});
		if(!p) return;
		$('#prodId').value=p.id;
		$('#prodTitle').value=p.title;
		$('#prodDesc').value=p.description;
		$('#prodPrice').value=String(p.price);
		$('#prodImage').value=p.imageUrl;
		$('#prodBuyUrl').value=p.buyUrl;
		$('#prodFeatured').checked=!!p.featured;
	}
	function bindForms(){
		$('#productForm').addEventListener('submit', async function(e){
			e.preventDefault();
			var id=$('#prodId').value.trim();
			var payload={
				title: $('#prodTitle').value.trim(),
				description: $('#prodDesc').value.trim(),
				price: parseFloat($('#prodPrice').value.trim()||'0'),
				imageUrl: $('#prodImage').value.trim(),
				buyUrl: $('#prodBuyUrl').value.trim(),
				featured: $('#prodFeatured').checked,
				updatedAt: Date.now()
			};
			if(!id){payload.createdAt=Date.now(); var r=await api('/api/products',{method:'POST',body:JSON.stringify(payload)}); toast('Created');}
			else {await api('/api/products',{method:'PUT',body:JSON.stringify(Object.assign({id:id},payload))}); toast('Updated');}
			refresh().catch(function(){})
		});
		$('#deleteProduct').addEventListener('click', async function(){
			var id=$('#prodId').value.trim(); if(!id) return toast('No product selected');
			await api('/api/products?id='+encodeURIComponent(id),{method:'DELETE'}); toast('Deleted');
			$('#productForm').reset(); refresh().catch(function(){})
		});
		$('#rulesForm').addEventListener('submit', async function(e){
			e.preventDefault(); var m=$('#rulesMarkdown').value; await api('/api/rules',{method:'PUT',body:JSON.stringify({markdown:m})}); toast('Rules saved');
		});
	}
	function initTabs(){
		$('[data-tab=\"products\"]').addEventListener('click', function(){switchTab('products')});
		$('[data-tab=\"rules\"]').addEventListener('click', function(){switchTab('rules')});
	}
	function switchTab(tab){
		$('.tab.active')&&$('.tab.active').classList.remove('active');
		$('[data-tab=\"'+tab+'\"]').classList.add('active');
		$('#tab-products').classList.add('hidden');
		$('#tab-rules').classList.add('hidden');
		if(tab==='products') $('#tab-products').classList.remove('hidden');
		if(tab==='rules') $('#tab-rules').classList.remove('hidden');
	}
	function initAuth(){
		var form = document.getElementById('adminLogin');
		var app = document.getElementById('admin-app');
		var auth = document.getElementById('admin-auth');
		var err = document.getElementById('authError');
		form.addEventListener('submit', function(e){
			e.preventDefault();
			var id=document.getElementById('adminId').value;
			var pass=document.getElementById('adminPass').value;
			if(id===ADMIN_ID && pass===ADMIN_PASS){ auth.classList.add('hidden'); app.classList.remove('hidden'); refresh().catch(function(){}); }
			else { err.textContent='Invalid credentials'; }
		});
	}
	setYear(); initAuth(); initTabs(); bindForms();
})();
