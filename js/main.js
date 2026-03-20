document.addEventListener('DOMContentLoaded', () => {
    // ── Sticky/Scrolled Navbar ─────────────────────────────────────────────
    const nav = document.querySelector('.navbar');
    if (nav) {
        const isInnerPage = /gallery|quote|services/.test(window.location.pathname);
        if (isInnerPage) {
            nav.classList.add('scrolled');
        } else {
            const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        }
    }

    // ── Mobile Menu (checkbox toggle; JS only for closing) ─────────────
    const navToggle = document.querySelector('.nav-toggle-input');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');

    if (navToggle && navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.checked = false;
            });
        });
    }

    if (navToggle && navOverlay) {
        navOverlay.addEventListener('click', () => {
            navToggle.checked = false;
        });
    }

    if (navToggle) {
        navToggle.addEventListener('change', () => {
            document.body.style.overflow = navToggle.checked ? 'hidden' : '';
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') navToggle.checked = false;
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) navToggle.checked = false;
        });
    }

    // ── Scroll Reveal Animations ────────────────────────────────────────
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });

    // ── Quote Form → WhatsApp ──────────────────────────────────────────
    const quoteForm = document.getElementById('quoteForm');
    if (!quoteForm) return;

    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('q-name')?.value.trim() || '';
        const phone = document.getElementById('q-phone')?.value.trim() || '';
        const email = document.getElementById('q-email')?.value.trim() || '';
        const type = document.getElementById('q-type')?.value || '';
        const guests = document.getElementById('q-guests')?.value.trim() || '';
        const location = document.getElementById('q-location')?.value.trim() || '';
        const date = document.getElementById('q-date')?.value || '';
        const theme = document.getElementById('q-theme')?.value.trim() || '';
        const service = quoteForm.querySelector('input[name="service"]:checked')?.value || 'Not specified';

        const formattedDate = date
            ? new Date(date + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
            : 'Not specified';

        const message =
`Hello Prestige Mobile Cocktail Bars! 🍸 I'd like to request a quote.

*Name:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Event Type:* ${type}
*Number of Guests:* ${guests}
*Location:* ${location}
*Event Date:* ${formattedDate}
*Theme/Inspiration:* ${theme || 'None specified'}
*Service Required:* ${service}

Please send me a custom quote. Thank you!`;

        const waTextEl = document.getElementById('wa-text');
        if (waTextEl) waTextEl.value = message;
        quoteForm.submit(); // Uses the form action to open WhatsApp, with our generated `text`
    });
});
