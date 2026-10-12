window.ZenkartCart = (function() {
  let items = JSON.parse(localStorage.getItem('zenkart_cart') || '[]');

  function save() {
    localStorage.setItem('zenkart_cart', JSON.stringify(items));
    render();
  }

  function render() {
    const container = document.getElementById('cart-drawer-items');
    const badge = document.getElementById('cart-count-badge');
    const subtotalEl = document.getElementById('cart-subtotal-price');

    if (!container) return;

    if (items.length === 0) {
      container.innerHTML = '<div class="py-12 text-center text-xs text-bone-muted">Your basket is empty.</div>';
      if (badge) badge.innerText = '0';
      if (subtotalEl) subtotalEl.innerText = '₹0';
      return;
    }

    let subtotal = 0;
    let totalCount = 0;

    container.innerHTML = items.map((item, index) => {
      subtotal += item.price * item.quantity;
      totalCount += item.quantity;
      return `
        <div class="flex items-center justify-between border-b border-border-dim pb-4">
          <div>
            <div class="text-xs font-bold text-bone">${item.title}</div>
            <div class="text-[11px] text-amber mt-0.5">₹${item.price} each</div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs text-bone-muted">Qty: ${item.quantity}</span>
            <button onclick="ZenkartCart.remove(${index})" class="text-[11px] text-red-400 hover:underline">Remove</button>
          </div>
        </div>
      `;
    }).join('');

    if (badge) badge.innerText = totalCount;
    if (subtotalEl) subtotalEl.innerText = '₹' + subtotal;
  }

  function add(id, title, price) {
    const existing = items.find(i => i.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ id, title, price, quantity: 1 });
    }
    save();
    openDrawer();
  }

  function remove(index) {
    items.splice(index, 1);
    save();
  }

  function openDrawer() {
    const overlay = document.getElementById('cart-drawer-overlay');
    const panel = document.getElementById('cart-drawer-panel');
    if (!overlay || !panel) return;
    overlay.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.remove('opacity-0');
      panel.classList.remove('translate-x-full');
    }, 10);
  }

  function closeDrawer() {
    const overlay = document.getElementById('cart-drawer-overlay');
    const panel = document.getElementById('cart-drawer-panel');
    if (!overlay || !panel) return;
    panel.classList.add('translate-x-full');
    overlay.classList.add('opacity-0');
    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 300);
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cart-toggle-btn')?.addEventListener('click', openDrawer);
    document.getElementById('cart-close-btn')?.addEventListener('click', closeDrawer);
    document.getElementById('cart-drawer-overlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'cart-drawer-overlay') closeDrawer();
    });
    render();
  });

  return { add, remove, openDrawer, closeDrawer };
})();
