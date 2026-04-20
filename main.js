let allProducts = [];
let cart = JSON.parse(localStorage.getItem('h_cart')) || []; // State Management [cite: 80]

// --- 1. AUTHENTICATION LOGIC [cite: 26] ---
const authForm = document.getElementById('auth-form');
if (authForm) {
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;

        // Validasi Password Min 6 Karakter [cite: 32]
        if (pass.length < 6) return alert("Password minimal 6 karakter!");

        let users = JSON.parse(localStorage.getItem('h_users')) || [];
        const userExists = users.find(u => u.email === email); // Validasi Email Unik [cite: 31]

        if (userExists) {
            if (userExists.pass === pass) {
                loginSuccess();
            } else {
                alert("Password salah!");
            }
        } else {
            // Register & Simpan di LocalStorage [cite: 28]
            users.push({ email, pass });
            localStorage.setItem('h_users', JSON.stringify(users));
            loginSuccess();
        }
    });
}

function loginSuccess() {
    sessionStorage.setItem('isLogged', 'true'); // User Session [cite: 82]
    location.reload();
}

if (sessionStorage.getItem('isLogged')) {
    document.getElementById('auth-page').classList.add('hidden');
    document.getElementById('shop-page').classList.remove('hidden');
    loadProducts(); // Load Produk dari JSON [cite: 34]
    renderOrderHistory(); // Riwayat Pembelian [cite: 67]
}

function logout() { sessionStorage.clear(); location.reload(); }

// --- 2. PRODUCT MANAGEMENT [cite: 33] ---
async function loadProducts() {
    const res = await fetch('data/products.json');
    allProducts = await res.json();
    renderProducts(allProducts);
    updateCartUI();
}

function renderProducts(data) {
    const list = document.getElementById('product-list');
    list.innerHTML = data.map(p => `
        <div class="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border dark:border-slate-700 flex flex-col">
            <img src="${p.image}" class="w-full h-48 object-cover rounded-xl mb-4" alt="${p.name}">
            <h3 class="font-bold text-lg">${p.name}</h3>
            <p class="text-xs text-slate-400 mb-4 flex-1">${p.description}</p>
            <div class="flex justify-between items-center mt-auto">
                <span class="text-indigo-600 font-black">Rp ${p.price.toLocaleString()}</span>
                <button onclick="addToCart(${p.id})" class="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-md shadow-indigo-200 dark:shadow-none">+ Cart</button>
            </div>
        </div>
    `).join('');
}

// --- 3. SEARCH [cite: 50] ---
document.getElementById('search').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allProducts.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
});

// --- 4. CART LOGIC [cite: 53, 56, 57] ---
window.addToCart = (id) => {
    const prod = allProducts.find(p => p.id === id);
    const inCart = cart.find(i => i.id === id);
    if (inCart) inCart.qty++; else cart.push({ ...prod, qty: 1 });
    saveCart();
};

window.updateQty = (id, n) => {
    const i = cart.find(x => x.id === id);
    if (i) { i.qty += n; if (i.qty <= 0) cart = cart.filter(x => x.id !== id); }
    saveCart();
};

function saveCart() {
    localStorage.setItem('h_cart', JSON.stringify(cart)); // State Cart [cite: 84]
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    let total = 0;
    container.innerHTML = cart.map(i => {
        total += i.price * i.qty;
        return `<div class="flex justify-between text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded-lg items-center">
            <span>${i.name}</span>
            <div class="flex items-center gap-2">
                <button onclick="updateQty(${i.id},-1)">-</button>
                <span class="font-bold">${i.qty}</span>
                <button onclick="updateQty(${i.id},1)">+</button>
            </div>
        </div>`;
    }).join('');
    document.getElementById('total-price').innerText = `Rp ${total.toLocaleString()}`;
    document.getElementById('btn-checkout').disabled = cart.length === 0;
}

// --- 5. CHECKOUT & 6. HISTORY [cite: 58, 65, 66] ---
window.openCheckout = () => document.getElementById('checkout-modal').classList.replace('hidden','flex');
window.closeCheckout = () => document.getElementById('checkout-modal').classList.replace('flex','hidden');

document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const order = {
        id: 'TX-' + Date.now(), // Generate ID Transaksi [cite: 66]
        cust: document.getElementById('cust-name').value,
        total: cart.reduce((a,b) => a+(b.price*b.qty), 0),
        items: [...cart],
        date: new Date().toLocaleString()
    };
    const orders = JSON.parse(localStorage.getItem('h_orders')) || []; // State Order [cite: 85]
    orders.push(order);
    localStorage.setItem('h_orders', JSON.stringify(orders));
    
    alert(`Sukses! ID: ${order.id}`);
    cart = []; saveCart(); closeCheckout(); renderOrderHistory();
});

function renderOrderHistory() {
    const container = document.getElementById('order-history');
    const orders = JSON.parse(localStorage.getItem('h_orders')) || [];
    container.innerHTML = orders.reverse().map(o => `
        <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border dark:border-slate-700">
            <div class="flex justify-between font-bold mb-2"><span>${o.id}</span><span>Rp ${o.total.toLocaleString()}</span></div>
            <div class="text-[10px] text-slate-400">${o.date} - ${o.cust}</div>
        </div>
    `).join('');
}

// --- 7. DARK MODE BONUS [cite: 87] ---
window.toggleDark = () => document.documentElement.classList.toggle('dark');