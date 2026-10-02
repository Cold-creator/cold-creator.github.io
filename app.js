(() => {
  const button = document.getElementById('language-toggle');
  const elements = [...document.querySelectorAll('[data-i18n]')];
  const english = new Map(elements.map(element => [element, element.innerHTML]));
  let language = 'en';
  function setLanguage(next) {
    language = next;
    document.documentElement.lang = next;
    for (const element of elements) {
      const value = next === 'en' ? english.get(element) : window.homepageChinese[element.dataset.i18n];
      if (value !== undefined) element.innerHTML = value;
    }
    button.textContent = next === 'en' ? '中文' : 'EN';
    button.setAttribute('aria-label', next === 'en' ? 'Switch to Chinese' : 'Switch to English');
    document.title = next === 'en' ? 'Chufeng Deng | HUST' : '邓楚枫 | 华中科技大学';
    try { localStorage.setItem('homepage-language', next); } catch { /* Preferences are optional. */ }
  }
  button.addEventListener('click', () => setLanguage(language === 'en' ? 'zh-CN' : 'en'));
  try { if (localStorage.getItem('homepage-language') === 'zh-CN') setLanguage('zh-CN'); } catch { /* English is the default. */ }
  document.getElementById('copyright-year').textContent = new Date().getFullYear();
  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('nav a')];
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        for (const link of links) {
          const active = link.hash === '#' + entry.target.id;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
        }
      }
    }, { rootMargin: '-15% 0px -60% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
  }
})();
