const discordInviteUrl = document.body.dataset.discordUrl;
const header = document.querySelector('.site-header');
const revealElements = document.querySelectorAll('[data-reveal]');
const discordLinks = document.querySelectorAll('.js-discord-link');

discordLinks.forEach((link) => {
    link.href = discordInviteUrl;
});

const syncHeaderState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 18);
};

syncHeaderState();
window.addEventListener('scroll', syncHeaderState, { passive: true });

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.16,
        rootMargin: '0px 0px -10% 0px'
    }
);

revealElements.forEach((element, index) => {
    element.style.setProperty('--reveal-delay', `${(index % 4) * 80}ms`);
    revealObserver.observe(element);
});