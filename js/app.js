let allProducts = [];
let cart = JSON.parse(localStorage.getItem('hamidah_cart')) || [];

// --- 1. AUTHENTICATION (LOGIN & REGISTER) [cite: 26, 27] ---
const authForm = document.getElementById('auth-form');
authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('hamidah_users')) || []; // [cite: 28]
    const user = users.find(u => u.email === email);

    if (user) {
        if (user.pass === pass) {
            loginSuccess();
        } else {
            alert("Password salah!");
        }
    } else {
        // Register: Email Unik & Pass min 6 [cite: 31, 32]
        users.push({ email, pass });
        localStorage.setItem('hamidah_users', JSON.stringify(users));
        loginSuccess();
    }
});

function loginSuccess() {
    sessionStorage.setItem('isLogged', 'true'); // [cite: 82]
    location.reload();
}

function checkSession() {
    if (sessionStorage.getItem('isLogged')) {
        document.getElementById('auth-page').classList.add('hidden');
        document.getElementById('shop-page').classList.remove('hidden');
        loadProducts();
        renderCart();
    }
}

function logout() {
    sessionStorage.clear();
    location.reload();
}

// --- 2. PRODUCT MANAGEMENT [cite: 33, 34] ---
async function loadProducts() {
    try {
        const res = await fetch('data/products.json'); // [cite: 17, 24]
        allProducts = await res.json();
        renderProducts(allProducts);
    } catch (err) {
        console.error("Gagal load produk:", err);
    }
}

function renderProducts(data) {
    const list = document.getElementById('product-list');
    list.innerHTML = data.map(p => `
        <div class="bg-white p-4 rounded shadow border hover:shadow-lg transition">
            <img src="${p.image}" class="w-full h-40 object-cover rounded mb-4">
            <h3 class="font-bold">${p.name}</h3>
            <p class="text-xs text-gray-500 mb-2">${p.description}</p>
            <div class="flex justify-between items-center mt-4">
                <span class="text-blue-600 font-bold">Rp ${p.price.toLocaleString()}</span>
                <button onclick="addToCart(${p.id})" class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-black transition">
                    + Cart
                </button>
            </div>
        </div>
    `).join('');
}

// --- 3. SEARCH & FILTER [cite: 50, 51] ---
document.getElementById('search').addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = allProducts.filter(p => p.name.toLowerCase().includes(keyword));
    renderProducts(filtered);
});

// --- 4. CART LOGIC (STATE MANAGEMENT) [cite: 53, 84] ---
window.addToCart = (id) => { // [cite: 54]
    const prod = allProducts.find(p => p.id === id);
    const item = cart.find(i => i.id === id);
    if (item) { item.qty++; } 
    else { cart.push({ ...prod, qty: 1 }); }
    saveCart();
};

window.updateQty = (id, change) => { // [cite: 56]
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id); // [cite: 55]
    }
    saveCart();
};

function saveCart() {
    localStorage.setItem('hamidah_cart', JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    const container = document.getElementById('cart-items');
    let total = 0;
    container.innerHTML = cart.map(i => {
        total += i.price * i.qty; // [cite: 57]
        return `
            <div class="flex justify-between items-center text-sm border-b pb-2">
                <div><p class="font-bold">${i.name}</p></div>
                <div class="flex items-center gap-2">
                    <button onclick="updateQty(${i.id}, -1)" class="px-2 bg-gray-100 rounded">-</button>
                    <span>${i.qty}</span>
                    <button onclick="updateQty(${i.id}, 1)" class="px-2 bg-gray-100 rounded">+</button>
                </div>
            </div>`;
    }).join('');
    document.getElementById('total-price').innerText = `Rp ${total.toLocaleString()}`;
    document.getElementById('btn-checkout').disabled = cart.length === 0;
}

// --- 5. CHECKOUT [cite: 58, 59] ---
window.openCheckout = () => document.getElementById('checkout-modal').classList.replace('hidden', 'flex');
window.closeCheckout = () => document.getElementById('checkout-modal').classList.replace('flex', 'hidden');

document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const order = {
        id: 'TX-' + Date.now(), // [cite: 66]
        items: cart,
        total: cart.reduce((acc, i) => acc + (i.price * i.qty), 0),
        date: new Date().toLocaleString()
    };
    const orders = JSON.parse(localStorage.getItem('hamidah_orders')) || []; // [cite: 85]
    orders.push(order); // [cite: 65]
    localStorage.setItem('hamidah_orders', JSON.stringify(orders));
    
    alert(`Transaksi Berhasil! ID: ${order.id}`);
    cart = [];
    saveCart();
    closeCheckout();
});

// Start the app
checkSession();