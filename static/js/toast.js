// static/js/toast.js
(function () {
  // helper simple for classes
  function applyClasses(el, classes) {
    classes.split(' ').forEach(c => c && el.classList.add(c));
  }

  window.showToast = function (title = '', message = '', type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    applyClasses(toast, 'pointer-events-auto flex items-start gap-3 p-4 rounded-lg shadow-lg border transition-all transform translate-y-4 opacity-0 max-w-sm');

    // style by type
    let icon = '';
    if (type === 'success') {
      applyClasses(toast, 'bg-green-50 border-green-500 text-green-700');
      icon = '✅';
    } else if (type === 'error') {
      applyClasses(toast, 'bg-red-50 border-red-500 text-red-700');
      icon = '❌';
    } else if (type === 'warning') {
      applyClasses(toast, 'bg-yellow-50 border-yellow-500 text-yellow-700');
      icon = '⚠️';
    } else {
      applyClasses(toast, 'bg-white border-gray-200 text-gray-800');
      icon = 'ℹ️';
    }

    toast.innerHTML = `
      <div class="text-xl">${icon}</div>
      <div class="flex-1 min-w-0">
        ${ title ? `<div class="font-semibold text-sm mb-1">${title}</div>` : '' }
        <div class="text-sm leading-snug break-words">${message}</div>
      </div>
      <button class="ml-3 self-start text-gray-400 hover:text-gray-700 focus:outline-none" aria-label="Close">✕</button>
    `;

    // close button handler
    const closeBtn = toast.querySelector('button');
    closeBtn.addEventListener('click', () => {
      hideToast(toast);
    });

    // append and animate in
    container.appendChild(toast);
    // force reflow then animate
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    });

    // auto hide
    const hideToast = (node) => {
      node.classList.add('translate-y-4', 'opacity-0');
      setTimeout(() => { node.remove(); }, 300);
    };

    setTimeout(() => hideToast(toast), duration);
  };
})();
