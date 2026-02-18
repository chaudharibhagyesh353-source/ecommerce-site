document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // --- MOBILE MENU LOGIC ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');

    function toggleMenu() {
        const isClosed = mobileMenu.classList.contains('translate-x-full');
        if (isClosed) {
            mobileMenu.classList.remove('translate-x-full');
            mobileOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            mobileMenu.classList.add('translate-x-full');
            mobileOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', toggleMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMenu);
});

// --- TOAST NOTIFICATION SYSTEM ---
// Made global so it can be called from other scripts
window.showToast = function(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    
    // Colors based on type
    const bgClass = type === 'error' ? 'bg-red-500' : 'bg-black';
    const icon = type === 'error' ? 'alert-circle' : 'check-circle';

    toast.className = `${bgClass} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[300px] toast-enter`;
    toast.innerHTML = `
        <i data-lucide="${icon}" class="w-5 h-5"></i>
        <span class="font-medium text-sm">${message}</span>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('toast-enter');
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// --- NEWSLETTER HANDLING ---
async function handleSubscribe(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch('/subscribe/', {
            method: 'POST',
            body: formData,
            headers: { 'X-CSRFToken': formData.get('csrfmiddlewaretoken') }
        });
        const result = await response.json();
        
        if (result.status === 'success') {
            showToast("Thanks for subscribing!");
            form.reset();
        } else {
            showToast("Subscription failed. Try again.", "error");
        }
    } catch (error) {
        showToast("Network error. Please try again.", "error");
    }
}
window.handleSubscribe = handleSubscribe;
