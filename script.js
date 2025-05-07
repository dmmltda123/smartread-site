// === Smooth Scrolling ===
document.querySelectorAll('header a[href^="#"], footer a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        // Ensure targetId is not just '#' to prevent errors
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate offset if header is sticky
                const headerOffset = document.querySelector('header')?.offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// === Placeholder for Video Controls ===
document.querySelectorAll('.video-controls button').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.textContent;
        // In a real scenario, you'd interact with a video player API
        alert(`Ação: ${action} (Funcionalidade de vídeo a implementar)`);
    });
});

// === File Upload Component Logic ===
const uploadArea = document.querySelector('.upload-area');
const fileInput = document.getElementById('file-upload');
const uploadLabel = uploadArea?.querySelector('label'); // Use optional chaining
const resultPlaceholder = document.querySelector('.result-placeholder'); // Placeholder for showing results

// Trigger file input click when upload area is clicked
if (uploadArea) {
    uploadArea.addEventListener('click', () => {
        fileInput?.click(); // Use optional chaining
    });
}

// Handle file selection via click
if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
}

// Handle drag and drop
if (uploadArea) {
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary-color)'; // Use CSS variable
        uploadArea.style.backgroundColor = '#eff6ff';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border-color)'; // Use CSS variable
        uploadArea.style.backgroundColor = 'var(--background-medium)';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-color)'; // Use CSS variable
        uploadArea.style.backgroundColor = 'var(--background-medium)';
        handleFiles(e.dataTransfer.files);
    });
}

function handleFiles(files) {
    if (!uploadLabel || !resultPlaceholder) return; // Exit if elements not found

    if (files && files.length > 0) {
        const file = files[0];
        // Basic validation (example: check type based on original site's supported formats)
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/jpeg', 'image/png'];

        // Check if file.type is one of the allowed types
        // Note: The original screenshot shows icons for PDF, Word, Excel, and Image (generic)
        // We'll allow common image types and document types shown.
        if (allowedTypes.includes(file.type) || file.type.startsWith('image/')) {
            uploadLabel.textContent = `Arquivo selecionado: ${file.name}`;
            resultPlaceholder.textContent = `Processando ${file.name}... (Simulação)`;
            resultPlaceholder.style.padding = '10px'; // Add some padding for text
            resultPlaceholder.style.textAlign = 'left';
            resultPlaceholder.style.color = 'var(--text-medium)';

            // Simulate processing delay
            setTimeout(() => {
                resultPlaceholder.textContent = `Resultado Simulado para: ${file.name}\nTipo: ${file.type}\nTamanho: ${(file.size / 1024).toFixed(2)} KB`;
                // Add a copy button dynamically or enable a hidden one
            }, 1500);
        } else {
            resultPlaceholder.textContent = 'Formato de arquivo não suportado.';
            resultPlaceholder.style.padding = '10px';
            resultPlaceholder.style.textAlign = 'center';
            resultPlaceholder.style.color = 'red';
            uploadLabel.textContent = 'Clique para selecionar ou arraste aqui';
        }
    } else {
         uploadLabel.textContent = 'Clique para selecionar ou arraste aqui';
         resultPlaceholder.textContent = ''; // Clear placeholder
         resultPlaceholder.style.padding = '0';
    }
}

// === Placeholder for Hamburger Menu ===
// Add HTML for hamburger button and mobile menu structure first
/*
const hamburgerBtn = document.getElementById('hamburger-btn'); // e.g., <button id=
*/

// === Video Controls ===
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('demo-video');
    
    if (video) {
        // Tenta iniciar o vídeo quando a página carrega
        video.play().catch(function(error) {
            console.log("Video play failed:", error);
        });

        // Reinicia o vídeo quando terminar
        video.addEventListener('ended', function() {
            video.currentTime = 0;
            video.play().catch(function(error) {
                console.log("Video replay failed:", error);
            });
        });

        // Observa quando o vídeo está visível na tela
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(function(error) {
                        console.log("Video autoplay failed:", error);
                    });
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(video);
    }
});

// Carousel functionality
let currentSlide = 0;
const totalSlides = 2; // Total number of pages in the carousel

function moveCarousel(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

function updateCarousel() {
    const grid = document.querySelector('.erp-grid');
    const dots = document.querySelectorAll('.dot');
    
    // Update carousel position
    grid.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    updateCarousel();
});

// Funções do Fluxograma
function ativarBloco(id) {
    const bloco = document.getElementById(id);
    if (bloco) {
        bloco.classList.add('active');
    }
}

function desativarBloco(id) {
    const bloco = document.getElementById(id);
    if (bloco) {
        bloco.classList.remove('active');
    }
}

function ativarLinha(id) {
    const linha = document.getElementById(id);
    if (linha) {
        linha.classList.add('active');
    }
}

// Função para posicionar linha entre dois blocos
function posicionarLinha(linhaId, blocoOrigemId, blocoDestinoId) {
    const origem = document.getElementById(blocoOrigemId);
    const destino = document.getElementById(blocoDestinoId);
    const linha = document.getElementById(linhaId);
    
    if (!origem || !destino || !linha) return;
    
    const origemRect = origem.getBoundingClientRect();
    const destinoRect = destino.getBoundingClientRect();
    
    // Calcula o centro dos blocos
    const origemX = origemRect.left + origemRect.width / 2;
    const origemY = origemRect.top + origemRect.height / 2;
    const destinoX = destinoRect.left + destinoRect.width / 2;
    const destinoY = destinoRect.top + destinoRect.height / 2;
    
    // Calcula o ângulo e comprimento da linha
    const angulo = Math.atan2(destinoY - origemY, destinoX - origemX);
    const comprimento = Math.sqrt(
        Math.pow(destinoX - origemX, 2) + Math.pow(destinoY - origemY, 2)
    );
    
    // Posiciona e rotaciona a linha
    linha.style.width = `${comprimento}px`;
    linha.style.left = `${origemX}px`;
    linha.style.top = `${origemY}px`;
    linha.style.transform = `rotate(${angulo}rad)`;
}

// Block 1 animation
document.addEventListener('DOMContentLoaded', () => {
    const bloco1Video = document.querySelector('#bloco1 .bloco-animation');
    
    if (bloco1Video) {
        // Reset and play video when it becomes visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bloco1Video.currentTime = 0;
                    bloco1Video.play().catch(console.error);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(bloco1Video);

        // Loop the video
        bloco1Video.addEventListener('ended', () => {
            bloco1Video.currentTime = 0;
            bloco1Video.play().catch(console.error);
        });
    }
});

// === Carrossel de Recursos (Todos os ganhos com o Smart Read) ===
let recursosCurrentSlide = 0;
const recursosGrid = document.querySelector('#recursos .erp-grid');
const recursosCards = recursosGrid ? Array.from(recursosGrid.children) : [];
const recursosDotsContainer = document.querySelector('.recursos-dots');
const recursosCardsPerSlide = 3; // 3 cards por slide no desktop
const recursosTotalSlides = recursosCards.length > 0 ? Math.ceil(recursosCards.length / recursosCardsPerSlide) : 1;

function renderRecursosDots() {
  if (!recursosDotsContainer) return;
  recursosDotsContainer.innerHTML = '';
  for (let i = 0; i < recursosTotalSlides; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === recursosCurrentSlide ? ' active' : '');
    dot.onclick = () => goToRecursosSlide(i);
    recursosDotsContainer.appendChild(dot);
  }
}

function moveRecursosCarousel(direction) {
  recursosCurrentSlide += direction;
  if (recursosCurrentSlide < 0) recursosCurrentSlide = 0;
  if (recursosCurrentSlide > recursosTotalSlides - 1) recursosCurrentSlide = recursosTotalSlides - 1;
  updateRecursosCarousel();
}

function goToRecursosSlide(slide) {
  recursosCurrentSlide = slide;
  updateRecursosCarousel();
}

function updateRecursosCarousel() {
  if (!recursosGrid) return;
  const cardWidth = recursosGrid.offsetWidth / recursosCardsPerSlide;
  recursosGrid.style.transform = `translateX(-${recursosCurrentSlide * cardWidth * recursosCardsPerSlide}px)`;
  renderRecursosDots();
}

// Inicialização do carrossel de recursos
if (recursosGrid && recursosCards.length > 0) {
  recursosGrid.style.transition = 'transform 0.5s';
  renderRecursosDots();
}

// Language selector functionality
function toggleLanguageMenu() {
    console.log('Toggle menu clicked');
    const menu = document.getElementById('languageMenu');
    const arrow = document.querySelector('.arrow-down');
    menu.classList.toggle('show');
    
    // Rotate arrow when menu is shown
    if (menu.classList.contains('show')) {
        arrow.style.transform = 'rotate(180deg)';
        // Add event listener for closing menu when clicking outside
        document.addEventListener('click', closeLanguageMenu);
    } else {
        arrow.style.transform = 'rotate(0deg)';
    }
}

function closeLanguageMenu(event) {
    const menu = document.getElementById('languageMenu');
    const languageSelector = document.querySelector('.language-selector');
    const arrow = document.querySelector('.arrow-down');
    
    if (!languageSelector.contains(event.target)) {
        menu.classList.remove('show');
        arrow.style.transform = 'rotate(0deg)';
        document.removeEventListener('click', closeLanguageMenu);
    }
}

// Add click event listeners when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Setting up language switcher');
    
    // Add click listeners to language options
    const languageOptions = document.querySelectorAll('.language-option');
    console.log('Found language options:', languageOptions.length);
    
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const lang = this.getAttribute('data-lang');
            console.log('Language option clicked:', lang);
            changeLanguage(lang);
        });
    });

    // Add click listener to language button
    const languageBtn = document.querySelector('.language-btn');
    if (languageBtn) {
        console.log('Found language button');
        languageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Language button clicked');
            toggleLanguageMenu();
        });
    }

    // Start with Portuguese
    console.log('Loading initial language (PT)');
    loadAndSetLanguage('pt');
});

let translations = {};
let currentLanguage = 'pt';

async function loadAndSetLanguage(lang) {
    try {
        console.log(`Loading language: ${lang}`);
        const response = await fetch(`smartread_tradução_site_${lang === 'en' ? 'ingles' : 'portugues'}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Translation data received:', data);
        translations[lang] = data;
        
        currentLanguage = lang;
        console.log('Updating content for language:', lang);
        updateContent();
        updateUIElements(lang);
    } catch (error) {
        console.error('Error loading language:', error);
    }
}

function updateContent() {
    if (!translations[currentLanguage]) {
        console.error('No translations loaded for:', currentLanguage);
        return;
    }

    const data = translations[currentLanguage].home;
    console.log('Updating content with data:', data);

    try {
        // Update menu items
        const menuLinks = document.querySelectorAll('.header-menu a');
        console.log('Found menu links:', menuLinks.length);
        menuLinks.forEach((link, index) => {
            const menuItems = ['howItWorks', 'integrations', 'security', 'pricing'];
            const translation = data.menu[menuItems[index]];
            if (translation) {
                console.log(`Updating menu item ${index} to:`, translation);
                link.textContent = translation;
            }
        });

        // Traduzir a seção "Múltiplos formatos suportados"
const formatosHeader = document.querySelector('.múltiplos-formatos-suportados') || 
document.querySelector('.file-formats-header') ||
document.querySelector('h3:contains("Múltiplos formatos")');

// Se não encontrar com os seletores acima, tente encontrar diretamente no container
if (!formatosHeader) {
// Encontra todos os elementos de texto na seção de formatos
const textoFormatos = document.querySelectorAll('.step-text p, .step-text h3');
textoFormatos.forEach(elemento => {
// Verifique se o texto contém "formatos suportados"
if (elemento.textContent.includes('formatos suportados')) {
if (currentLanguage === 'en') {
elemento.textContent = 'Multiple supported formats';
} else {
elemento.textContent = 'Múltiplos formatos suportados';
}
}

// Verifique se o texto contém a lista de formatos
if (elemento.textContent.includes('Excel, PDF, JPEG')) {
// Este texto geralmente não precisa de tradução pois são nomes de formatos
console.log('Encontrou lista de formatos:', elemento.textContent);
}
});
}
        // Update hero section
        const heroTitle = document.querySelector('#hero h1');
        if (heroTitle && data.hero) {
            console.log('Updating hero title to:', data.hero.mainTitle);
            heroTitle.innerHTML = data.hero.mainTitle;
        }

        const heroSubtitle = document.querySelector('#hero p');
        if (heroSubtitle && data.hero) {
            console.log('Updating hero subtitle to:', data.hero.subtitle);
            heroSubtitle.textContent = data.hero.subtitle;
        }

        // Update email placeholder
        const emailInput = document.querySelector('#hero input[type="email"]');
        if (emailInput && data.hero && data.hero.buttons) {
            emailInput.placeholder = data.hero.buttons.email;
        }

        // Update try now button
        const tryNowBtn = document.querySelector('#hero button[type="submit"]');
        if (tryNowBtn && data.hero && data.hero.buttons) {
            tryNowBtn.textContent = data.hero.buttons.tryNow;
        }

        // Update "How it works" section
        const howItWorksTitle = document.querySelector('#como-funciona h2');
        if (howItWorksTitle && data.howItWorks) {
            howItWorksTitle.textContent = data.howItWorks.title;
        }

        const howItWorksSubtitle = document.querySelector('#como-funciona .subtitle-gray');
        if (howItWorksSubtitle && data.howItWorks) {
            howItWorksSubtitle.textContent = data.howItWorks.subtitle;
        }

        // Update steps
        document.querySelectorAll('.step').forEach((step, index) => {
            const stepNum = index + 1;
            const stepData = data.howItWorks.steps[`step${stepNum}`];
            
            if (stepData) {
                const titleEl = step.querySelector('h3');
                const descEl = step.querySelector('p');
                
                if (titleEl) titleEl.textContent = stepData.title;
                if (descEl) descEl.textContent = stepData.description;
            }
        });

        // Atualizar label "Tempo médio de processamento" (ou "Average processing time")
        const processingTimeLabel = document.querySelector('.processing-time-label');
        if (processingTimeLabel && data.howItWorks && data.howItWorks.steps && data.howItWorks.steps.step2 && data.howItWorks.steps.step2.processingTime) {
            processingTimeLabel.textContent = data.howItWorks.steps.step2.processingTime;
        }

        // Update integrations section
        const integrationsTitle = document.querySelector('#integracoes h2');
        if (integrationsTitle && data.integration) {
            integrationsTitle.textContent = data.integration.title;
        }

        const integrationsDesc = document.querySelector('#integracoes .section-subtitle');
        if (integrationsDesc && data.integration) {
            integrationsDesc.textContent = data.integration.description;
        }

        // Update security section
        const securityTitle = document.querySelector('#seguranca h2');
        if (securityTitle && data.security) {
            securityTitle.textContent = data.security.title;
        }

        const securityDesc = document.querySelector('#seguranca .section-subtitle');
        if (securityDesc && data.security) {
            securityDesc.textContent = data.security.description;
        }

        // Atualizar cards de exportação (planilhas)
        const exportSection = translations[currentLanguage].home.spreadsheets;
        if (exportSection) {
            // Título e subtítulo da seção
            const exportTitle = document.querySelector('#export-section h2');
            if (exportTitle) exportTitle.textContent = exportSection.title;

            const exportSubtitle = document.querySelector('#export-section .section-subtitle');
            if (exportSubtitle) exportSubtitle.textContent = exportSection.description;

            // Cards
            const exportCards = document.querySelectorAll('#export-section .export-card');
            const cardKeys = ['excel', 'googleSheets', 'csvXlsx'];
            exportCards.forEach((card, idx) => {
                const key = cardKeys[idx];
                const cardData = exportSection[key];
                if (cardData) {
                    const cardTitle = card.querySelector('h3');
                    if (cardTitle) cardTitle.textContent = cardData.title;

                    const cardDesc = card.querySelector('p');
                    if (cardDesc) cardDesc.textContent = cardData.description;

                    // Lista de features
                    const featuresList = card.querySelectorAll('ul li');
                    if (featuresList && cardData.features) {
                        featuresList.forEach((li, i) => {
                            li.textContent = cardData.features[i] || '';
                        });
                    }
                }
            });
        }

        // Atualizar cards da seção de segurança
        const securitySection = translations[currentLanguage].home.security;
        if (securitySection) {
            // Título e subtítulo da seção
            const securityTitle = document.querySelector('#seguranca h2');
            if (securityTitle) securityTitle.textContent = securitySection.title;

            const securitySubtitle = document.querySelector('#seguranca .section-subtitle');
            if (securitySubtitle) securitySubtitle.textContent = securitySection.description;

            // Cards
            const securityCards = document.querySelectorAll('#seguranca .erp-card');
            const cardKeys = ['encryption', 'infrastructure', 'certifications'];
            securityCards.forEach((card, idx) => {
                const key = cardKeys[idx];
                const cardData = securitySection[key];
                if (cardData) {
                    const cardTitle = card.querySelector('h3');
                    if (cardTitle) cardTitle.textContent = cardData.title;

                    const cardDesc = card.querySelector('p');
                    if (cardDesc) cardDesc.textContent = cardData.description;
                }
            });
        }

        // Seção de upload/teste-extracao (traduz título, subtítulo, label e placeholder só em inglês)
        const testSection = translations[currentLanguage].home.cta;
        if (testSection) {
            // Só traduzir título, subtítulo, label e placeholder se for inglês
            if (currentLanguage === 'en') {
                const testTitle = document.querySelector('#teste-extracao h2');
                if (testTitle && testSection.title) testTitle.textContent = testSection.title;
                const testSubtitle = document.querySelector('#teste-extracao .section-subtitle');
                if (testSubtitle && testSection.description) testSubtitle.textContent = testSection.description;
                // LOGS DE DEPURAÇÃO
                console.log('LANG:', currentLanguage);
                console.log('data.howItWorks.steps.step1.supportedFormats:', data.howItWorks?.steps?.step1?.supportedFormats);
                console.log('data.howItWorks.steps.step2.processingTime:', data.howItWorks?.steps?.step2?.processingTime);
                // Label "Formatos suportados" (seletor flexível e JSON correto)
                let formatsLabel = document.querySelector('#teste-extracao .supported-formats span');
                if (!formatsLabel) {
                    formatsLabel = document.querySelector('#teste-extracao .supported-formats');
                }
                if (formatsLabel && data.labels && data.labels.supportedFormats) {
                    formatsLabel.textContent = data.labels.supportedFormats + ':';
                }
                // Label "Tempo médio de processamento"
                const processingTimeLabel = document.querySelector('.processing-time-label');
                if (processingTimeLabel && data.labels && data.labels.processingTime) {
                    processingTimeLabel.textContent = data.labels.processingTime;
                }
                // Placeholder do input de e-mail
                const emailInputTest = document.querySelector('#teste-extracao input[type="email"]');
                if (emailInputTest && testSection.emailPlaceholder) emailInputTest.placeholder = testSection.emailPlaceholder;
            }
            const uploadTitle = document.querySelector('#teste-extracao h3');
            if (uploadTitle && testSection.uploadText) uploadTitle.textContent = testSection.uploadText;
            // Instrução de upload (dragDropText) - garantir que é o <p> correto
            let uploadDesc = document.querySelector('#teste-extracao .upload-instruction');
            if (!uploadDesc) {
                // fallback: segundo <p> dentro do #teste-extracao
                const allPs = document.querySelectorAll('#teste-extracao p');
                if (allPs.length > 1) uploadDesc = allPs[1];
            }
            if (uploadDesc && testSection.dragDropText) uploadDesc.textContent = testSection.dragDropText;
            const uploadLabel = document.querySelector('#teste-extracao label');
            if (uploadLabel && testSection.clickText) uploadLabel.textContent = testSection.clickText;
            const startBtnTest = document.querySelector('#teste-extracao button[type="submit"]');
            if (startBtnTest && testSection.button) startBtnTest.textContent = testSection.button;
        }

        // Seção de depoimentos
        const testimonialsSection = translations[currentLanguage].home.testimonials;
        if (testimonialsSection) {
            const testimonialsTitle = document.querySelector('#depoimentos h2');
            if (testimonialsTitle) testimonialsTitle.textContent = testimonialsSection.title;
            const testimonialsSubtitle = document.querySelector('#depoimentos .section-subtitle');
            if (testimonialsSubtitle) testimonialsSubtitle.textContent = testimonialsSection.subtitle;
            const testimonialCards = document.querySelectorAll('#depoimentos .testimonial-card');
            if (testimonialCards.length && testimonialsSection.items) {
                testimonialCards.forEach((card, idx) => {
                    const item = testimonialsSection.items[idx];
                    if (item) {
                        const quote = card.querySelector('.quote');
                        if (quote) quote.textContent = item.text;
                        const name = card.querySelector('h4');
                        if (name) name.textContent = item.name;
                        const role = card.querySelector('.author-details p');
                        if (role) role.innerHTML = `${item.role},<br>${item.company}`;
                    }
                });
            }
        }

        // Seção de preços (restaurado para preencher currency, amount e unit separadamente)
        const pricingSection = translations[currentLanguage].home.pricing;
        if (pricingSection) {
            const pricingTitle = document.querySelector('#precos h2');
            if (pricingTitle) pricingTitle.textContent = pricingSection.title;
            const pricingSubtitle = document.querySelector('#precos .section-subtitle');
            if (pricingSubtitle) pricingSubtitle.textContent = pricingSection.subtitle;
            const pricingCards = document.querySelectorAll('#precos .pricing-card');
            if (pricingCards.length && pricingSection.plans) {
                pricingCards.forEach((card, idx) => {
                    const plan = pricingSection.plans[idx];
                    if (plan) {
                        const cardTitle = card.querySelector('h3');
                        if (cardTitle) cardTitle.textContent = plan.name;
                        // Preço
                        const priceCurrency = card.querySelector('.price .currency');
                        const priceAmount = card.querySelector('.price .amount');
                        const priceUnit = card.querySelector('.price .unit');
                        if (priceCurrency) priceCurrency.textContent = plan.currency || '';
                        if (priceAmount) priceAmount.textContent = plan.price || '';
                        if (priceUnit) {
                            console.log('Atualizando .unit para:', plan.unit, 'no card', idx);
                            priceUnit.textContent = plan.unit || '';
                        } else {
                            console.warn('Não encontrou .unit no card', idx);
                        }
                        // Detalhes
                        const details = card.querySelectorAll('ul.features li');
                        if (details && plan.details) {
                            details.forEach((li, i) => {
                                li.textContent = plan.details[i] || '';
                            });
                        }
                    }
                });
            }
        }

        // Rodapé (corrigido para nova estrutura)
        const footerSection = translations[currentLanguage].home.footer;
        if (footerSection) {
            // Sobre nós
            const aboutTitle = document.querySelector('.footer-col h4');
            if (aboutTitle && footerSection.aboutUs) aboutTitle.textContent = footerSection.aboutUs.title;
            const aboutText = document.querySelector('.footer-col p');
            if (aboutText && footerSection.aboutUs) aboutText.textContent = footerSection.aboutUs.description;
            const visitBtn = document.querySelector('.footer-cta');
            if (visitBtn && footerSection.aboutUs) visitBtn.textContent = footerSection.aboutUs.institutionalButton;
            // Links rápidos
            const quickLinksTitle = document.querySelectorAll('.footer-col h4')[1];
            if (quickLinksTitle && footerSection.quickLinks) quickLinksTitle.textContent = footerSection.quickLinks.title;
            const quickLinks = document.querySelectorAll('.footer-col ul li a');
            if (quickLinks.length && footerSection.quickLinks && footerSection.quickLinks.links) {
                quickLinks.forEach((a, i) => {
                    a.textContent = footerSection.quickLinks.links[i] || '';
                });
            }
            // Contato
            const contactTitle = document.querySelectorAll('.footer-col h4')[2];
            if (contactTitle && footerSection.contact) contactTitle.textContent = footerSection.contact.title;
            const emailLabel = document.querySelector('.footer-contact p a');
            if (emailLabel && footerSection.contact) emailLabel.textContent = footerSection.contact.email;
            const phoneLabel = document.querySelectorAll('.footer-contact p')[1];
            if (phoneLabel && footerSection.contact) phoneLabel.textContent = footerSection.contact.phone;
        }

        // Atualizar botão do header para usar home.menu.contactButton
        const ctaBtn = document.querySelector('.header-cta-btn');
        if (ctaBtn && translations[currentLanguage].home.menu.contactButton) {
            ctaBtn.textContent = translations[currentLanguage].home.menu.contactButton;
        }

        // Atualizar label de formatos suportados (step1)
        const labelSupportedFormats = document.querySelector('.label-supported-formats');
        if (
          labelSupportedFormats &&
          data.howItWorks &&
          data.howItWorks.steps &&
          data.howItWorks.steps.step1 &&
          data.howItWorks.steps.step1.labelSupportedFormats
        ) {
          labelSupportedFormats.textContent = data.howItWorks.steps.step1.labelSupportedFormats;
        }

    } catch (error) {
        console.error('Error in updateContent:', error);
    }
}

function updateUIElements(lang) {
    const currentFlag = document.getElementById('current-lang-flag');
    const currentText = document.getElementById('current-lang-text');
    const menu = document.getElementById('languageMenu');
    const arrow = document.querySelector('.arrow-down');
    
    if (lang === 'pt') {
        currentFlag.src = 'assets/flags/br.svg';
        currentText.textContent = 'PT';
        document.documentElement.lang = 'pt-BR';
    } else if (lang === 'en') {
        currentFlag.src = 'assets/flags/us.svg';
        currentText.textContent = 'EN';
        document.documentElement.lang = 'en';
    }
    
    menu.classList.remove('show');
    arrow.style.transform = 'rotate(0deg)';
}

// This function will be called by the click event listeners
function changeLanguage(lang) {
    console.log('Change language called with:', lang);
    loadAndSetLanguage(lang);
}

// Add data-i18n attributes when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Adding i18n attributes');
  
  // Menu items
  const menuItems = document.querySelectorAll('.header-menu a');
  menuItems.forEach((item, index) => {
    const keys = ['howItWorks', 'integrations', 'security', 'pricing'];
    item.setAttribute('data-i18n', `home.menu.${keys[index]}`);
  });

  // Hero section
  const heroTitle = document.querySelector('#hero h1');
  if (heroTitle) {
    heroTitle.setAttribute('data-i18n-html', 'home.hero.mainTitle');
  }

  const heroSubtitle = document.querySelector('#hero p');
  if (heroSubtitle) {
    heroSubtitle.setAttribute('data-i18n', 'home.hero.subtitle');
  }

  // How it works section
  const howItWorksTitle = document.querySelector('#como-funciona h2');
  if (howItWorksTitle) {
    howItWorksTitle.setAttribute('data-i18n', 'home.howItWorks.title');
  }

  const howItWorksSubtitle = document.querySelector('#como-funciona .subtitle-gray');
  if (howItWorksSubtitle) {
    howItWorksSubtitle.setAttribute('data-i18n', 'home.howItWorks.subtitle');
  }

  // Steps
  const steps = document.querySelectorAll('.step');
  steps.forEach((step, index) => {
    const title = step.querySelector('h3');
    const description = step.querySelector('p');
    if (title) {
      title.setAttribute('data-i18n', `home.howItWorks.steps.step${index + 1}.title`);
    }
    if (description) {
      description.setAttribute('data-i18n', `home.howItWorks.steps.step${index + 1}.description`);
    }
  });

  // CTA button
  const ctaBtn = document.querySelector('.header-cta-btn');
  if (ctaBtn) {
    ctaBtn.setAttribute('data-i18n', 'home.cta.talkToTeam');
  }
});
