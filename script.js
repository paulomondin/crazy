document.addEventListener('DOMContentLoaded', function() {
    // Adicionar atributo data-text aos elementos com classe glitch-text
    const glitchTexts = document.querySelectorAll('.glitch-text');
    glitchTexts.forEach(text => {
        text.setAttribute('data-text', text.textContent);
    });

    // Efeito de glitch aleatório nos textos
    setInterval(() => {
        const randomGlitch = Math.floor(Math.random() * glitchTexts.length);
        if (glitchTexts[randomGlitch]) {
            glitchTexts[randomGlitch].classList.add('active-glitch');
            setTimeout(() => {
                glitchTexts[randomGlitch].classList.remove('active-glitch');
            }, 200);
        }
    }, 3000);

    // Animação de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Botão de compra com efeito de glitch
    const buyButton = document.querySelector('.glitch-button');
    if (buyButton) {
        buyButton.addEventListener('click', function() {
            this.classList.add('clicked');
            this.textContent = 'EM BREVE';
            
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 2000);
        });
    }

    // Efeito de parallax no scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Parallax para elementos de fundo
        document.querySelectorAll('.split::before').forEach(bg => {
            const speed = 0.5;
            bg.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });

    // Animação para elementos que entram na viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar cards de informação e itens da timeline
    document.querySelectorAll('.info-card, .timeline-item').forEach(item => {
        observer.observe(item);
    });
});

// Adicionar classe CSS para animações de entrada
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .info-card, .timeline-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .info-card.in-view, .timeline-item.in-view {
            opacity: 1;
            transform: translateY(0);
        }
        
        .timeline-item:nth-child(odd).in-view {
            transform: translateX(0);
        }
        
        .timeline-item:nth-child(even).in-view {
            transform: translateX(0);
        }
        
        .active-glitch {
            animation: glitch-animation 0.2s linear 3;
        }
        
        @keyframes glitch-animation {
            0% {
                transform: translate(0);
            }
            20% {
                transform: translate(-5px, 5px);
            }
            40% {
                transform: translate(-5px, -5px);
            }
            60% {
                transform: translate(5px, 5px);
            }
            80% {
                transform: translate(5px, -5px);
            }
            100% {
                transform: translate(0);
            }
        }
        
        .glitch-button.clicked {
            animation: button-glitch 0.3s linear;
            background: linear-gradient(90deg, #ff4500, #0066cc, #ff4500);
            background-size: 200% 100%;
            animation: button-gradient 2s linear infinite;
        }
        
        @keyframes button-glitch {
            0% { transform: translate(0); }
            25% { transform: translate(-5px, 5px); }
            50% { transform: translate(5px, -5px); }
            75% { transform: translate(-3px, -3px); }
            100% { transform: translate(0); }
        }
        
        @keyframes button-gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    </style>
`);

