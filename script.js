// Definição global da função changeLanguage
function changeLanguage(lang) {
    console.log('Language change requested to:', lang);
    loadAndSetLanguage(lang);
    // Aumentando o tempo para garantir que a tradução principal seja carregada primeiro
    setTimeout(function() {
      traduzirContainersEspeciais();
    }, 800); // Aumentado de 500ms para 800ms para maior segurança
}

// Garantir que está no escopo global
window.changeLanguage = changeLanguage;

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
            uploadLabel.textContent = getTranslation(currentLanguage, 'upload.fileSelected', file.name);
            resultPlaceholder.textContent = getTranslation(currentLanguage, 'upload.processing', file.name);
            resultPlaceholder.style.padding = '10px'; // Add some padding for text
            resultPlaceholder.style.textAlign = 'left';
            resultPlaceholder.style.color = 'var(--text-medium)';

            // Simulate processing delay
            setTimeout(() => {
                resultPlaceholder.textContent = getTranslation(currentLanguage, 'upload.result', {
                    fileName: file.name,
                    fileType: file.type,
                    fileSize: (file.size / 1024).toFixed(2)
                });
                // Add a copy button dynamically or enable a hidden one
            }, 1500);
        } else {
            resultPlaceholder.textContent = getTranslation(currentLanguage, 'upload.unsupportedFormat');
            resultPlaceholder.style.padding = '10px';
            resultPlaceholder.style.textAlign = 'center';
            resultPlaceholder.style.color = 'red';
            uploadLabel.textContent = getTranslation(currentLanguage, 'upload.dragAndDrop');
        }
    } else {
         uploadLabel.textContent = getTranslation(currentLanguage, 'upload.dragAndDrop');
         resultPlaceholder.textContent = ''; // Clear placeholder
         resultPlaceholder.style.padding = '0';
    }
}

// Função auxiliar para obter traduções com placeholders
function getTranslation(lang, key, params) {
    if (!translations[lang]) return '';
    
    // Estrutura básica de traduções para o componente de upload
    const uploadTranslations = {
        'pt': {
            'upload.fileSelected': 'Arquivo selecionado: $fileName',
            'upload.processing': 'Processando $fileName... (Simulação)',
            'upload.result': 'Resultado Simulado para: $fileName\nTipo: $fileType\nTamanho: $fileSize KB',
            'upload.unsupportedFormat': 'Formato de arquivo não suportado.',
            'upload.dragAndDrop': 'Clique para selecionar ou arraste aqui'
        },
        'en': {
            'upload.fileSelected': 'File selected: $fileName',
            'upload.processing': 'Processing $fileName... (Simulation)',
            'upload.result': 'Simulated Result for: $fileName\nType: $fileType\nSize: $fileSize KB',
            'upload.unsupportedFormat': 'Unsupported file format.',
            'upload.dragAndDrop': 'Click to select or drag here'
        },
        'es': {
            'upload.fileSelected': 'Archivo seleccionado: $fileName',
            'upload.processing': 'Procesando $fileName... (Simulación)',
            'upload.result': 'Resultado Simulado para: $fileName\nTipo: $fileType\nTamaño: $fileSize KB',
            'upload.unsupportedFormat': 'Formato de archivo no soportado.',
            'upload.dragAndDrop': 'Haga clic para seleccionar o arrastre aquí'
        },
        'de': {
            'upload.fileSelected': 'Datei ausgewählt: $fileName',
            'upload.processing': 'Verarbeitung von $fileName... (Simulation)',
            'upload.result': 'Simuliertes Ergebnis für: $fileName\nTyp: $fileType\nGröße: $fileSize KB',
            'upload.unsupportedFormat': 'Nicht unterstütztes Dateiformat.',
            'upload.dragAndDrop': 'Klicken Sie zum Auswählen oder ziehen Sie hier'
        },
        'zh': {
            'upload.fileSelected': '已选择文件：$fileName',
            'upload.processing': '正在处理 $fileName...（模拟）',
            'upload.result': '$fileName 的模拟结果\n类型：$fileType\n大小：$fileSize KB',
            'upload.unsupportedFormat': '不支持的文件格式。',
            'upload.dragAndDrop': '点击选择或拖拽到此处'
        }
    };
    
    // Pegar o texto base para a chave solicitada
    let text = uploadTranslations[lang]?.[key] || uploadTranslations['en']?.[key] || key;
    
    // Substituir placeholders se necessário
    if (params) {
        if (typeof params === 'string') {
            text = text.replace('$fileName', params);
        } else {
            // Para objetos mais complexos com múltiplos parâmetros
            for (const [paramKey, paramValue] of Object.entries(params)) {
                text = text.replace(`$${paramKey}`, paramValue);
            }
        }
    }
    
    return text;
}

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
    
    // Verifica se o clique foi em um botão de idioma
    if (event.target.closest('.language-option')) {
        return; // Não fecha o menu se clicou em uma opção de idioma
    }
    
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
        // Atualizando para usar nomes de arquivos padronizados
        let jsonFileName;
        
        // Definir o nome do arquivo baseado no idioma selecionado
        switch(lang) {
            case 'pt':
                jsonFileName = 'smartread_traducao_site_portugues';
                break;
            case 'en':
                jsonFileName = 'smartread_tradução_site_ingles';
                break;
            case 'es':
                jsonFileName = 'smartread_tradução_site_espanhol';
                break;
            case 'de':
                jsonFileName = 'smartread_traducao_site_alemao';
                break;
            case 'zh':
                jsonFileName = 'smartread_tradução_site_chines';
                break;
            default:
                jsonFileName = 'smartread_traducao_site_portugues';
        }
        
        const response = await fetch(jsonFileName);
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
        
        // Disparar evento personalizado quando as traduções forem carregadas
        document.dispatchEvent(new CustomEvent('languageLoaded', { detail: { language: lang } }));
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
        // Encontra todos os elementos de texto na seção de formatos
        const textoFormatos = document.querySelectorAll('.step-text p, .step-text h3');
        textoFormatos.forEach(elemento => {
            // Verifique se o texto contém "formatos suportados"
            if (elemento.textContent.includes('formatos suportados')) {
                if (data.howItWorks && data.howItWorks.steps && data.howItWorks.steps.step1 && data.howItWorks.steps.step1.labelSupportedFormats) {
                    elemento.textContent = data.howItWorks.steps.step1.labelSupportedFormats;
                }
            }

            // Verifique se o texto contém a lista de formatos
            if (elemento.textContent.includes('Excel, PDF, JPEG')) {
                if (data.howItWorks && data.howItWorks.steps && data.howItWorks.steps.step1 && data.howItWorks.steps.step1.formats) {
                    elemento.textContent = data.howItWorks.steps.step1.formats;
                }
            }
        });
        
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
        if (processingTimeLabel && data.howItWorks && data.howItWorks.steps && data.howItWorks.steps.step2 && data.howItWorks.steps.step2.processingTimeLabel) {
            processingTimeLabel.textContent = data.howItWorks.steps.step2.processingTimeLabel;
        }
        
        // Atualizar valor do tempo de processamento
        const processingTimeValue = document.querySelector('.processing-time-value');
        if (processingTimeValue && data.howItWorks && data.howItWorks.steps && data.howItWorks.steps.step2 && data.howItWorks.steps.step2.processingTimeValue) {
            processingTimeValue.textContent = data.howItWorks.steps.step2.processingTimeValue;
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
                            if (cardData.features[i]) {
                                li.textContent = cardData.features[i];
                            }
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

        // Seção de upload/teste-extracao
        const testSection = translations[currentLanguage].home.cta;
        if (testSection) {
            const testTitle = document.querySelector('#teste-extracao h2');
            if (testTitle && testSection.title) testTitle.textContent = testSection.title;
            
            const testSubtitle = document.querySelector('#teste-extracao .section-subtitle');
            if (testSubtitle && testSection.description) testSubtitle.textContent = testSection.description;
            
            // Formatação suportada
            let formatsLabel = document.querySelector('#teste-extracao .supported-formats span');
            if (!formatsLabel) {
                formatsLabel = document.querySelector('#teste-extracao .supported-formats');
            }
            
            // Usando labels dos dados para maior compatibilidade entre os JSONs
            if (formatsLabel && data.labels && data.labels.supportedFormats) {
                formatsLabel.textContent = data.labels.supportedFormats + ':';
            }
            
            // Upload de documento texto
            const uploadTitle = document.querySelector('#teste-extracao h3');
            if (uploadTitle && testSection.uploadText) uploadTitle.textContent = testSection.uploadText;
            
            // Instrução de upload
            let uploadDesc = document.querySelector('#teste-extracao .upload-instruction');
            if (!uploadDesc) {
                const allPs = document.querySelectorAll('#teste-extracao p');
                if (allPs.length > 1) uploadDesc = allPs[1];
            }
            if (uploadDesc && testSection.dragDropText) uploadDesc.textContent = testSection.dragDropText;
            
            // Label do upload
            const uploadLabel = document.querySelector('#teste-extracao label');
            if (uploadLabel && testSection.clickText) uploadLabel.textContent = testSection.clickText;
            
            // Botão de iniciar/testar
            const startBtnTest = document.querySelector('#teste-extracao button[type="submit"]');
            if (startBtnTest && testSection.button) startBtnTest.textContent = testSection.button;
            
            // Email placeholder
            const emailInputTest = document.querySelector('#teste-extracao input[type="email"]');
            if (emailInputTest && testSection.emailPlaceholder) emailInputTest.placeholder = testSection.emailPlaceholder;
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

        // Seção de preços
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
                        if (priceUnit) priceUnit.textContent = plan.unit || '';
                        
                        // Detalhes
                        const details = card.querySelectorAll('ul.features li');
                        if (details && plan.details) {
                            details.forEach((li, i) => {
                                if (plan.details[i]) {
                                    li.textContent = plan.details[i];
                                }
                            });
                        }
                        
                        // Botão
                        const startButton = card.querySelector('.pricing-button span');
                        if (startButton && plan.button) {
                            startButton.textContent = plan.button;
                        }
                    }
                });
            }
        }

        // Rodapé
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
                    if (footerSection.quickLinks.links[i]) {
                        a.textContent = footerSection.quickLinks.links[i];
                    }
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
        if (ctaBtn && translations[currentLanguage].home.cta && translations[currentLanguage].home.cta.talkToTeam) {
            ctaBtn.textContent = translations[currentLanguage].home.cta.talkToTeam;
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
    
    // Atualizar bandeira e texto do seletor de idioma atual
    switch(lang) {
        case 'pt':
            currentFlag.src = 'assets/flags/br.svg';
            currentText.textContent = 'PT';
            document.documentElement.lang = 'pt-BR';
            break;
        case 'en':
            currentFlag.src = 'assets/flags/us.svg';
            currentText.textContent = 'EN';
            document.documentElement.lang = 'en';
            break;
        case 'es':
            currentFlag.src = 'assets/flags/es.svg';
            currentText.textContent = 'ES';
            document.documentElement.lang = 'es';
            break;
        case 'de':
            currentFlag.src = 'assets/flags/de.svg';
            currentText.textContent = 'DE';
            document.documentElement.lang = 'de';
            break;
        case 'zh':
            currentFlag.src = 'assets/flags/cn.svg';
            currentText.textContent = 'ZH';
            document.documentElement.lang = 'zh-CN';
            break;
    }
    
    menu.classList.remove('show');
    arrow.style.transform = 'rotate(0deg)';
}

// Função para traduzir containers específicos
function traduzirContainersEspeciais() {
    // Verificar se as traduções foram carregadas
    if (!translations[currentLanguage] || !translations[currentLanguage].home) {
      console.log("Traduções ainda não carregadas");
      return;
    }
    
    try {
      const data = translations[currentLanguage].home;
      
      // 1. Container de formatos suportados (imagem 1)
      const formatosSuportadosTexto = document.querySelector('.label-supported-formats');
      const formatosListaTexto = document.querySelector('.formats-list');
      
      if (formatosSuportadosTexto && data.howItWorks && data.howItWorks.steps && data.howItWorks.steps.step1 && data.howItWorks.steps.step1.labelSupportedFormats) {
        formatosSuportadosTexto.textContent = data.howItWorks.steps.step1.labelSupportedFormats;
      }
      
      if (formatosListaTexto && data.howItWorks && data.howItWorks.steps && data.howItWorks.steps.step1 && data.howItWorks.steps.step1.formats) {
        formatosListaTexto.textContent = data.howItWorks.steps.step1.formats;
      }
      
      // 2. Container de tempo de processamento (imagem 2)
      const tempoProcessamentoTexto = document.querySelector('.processing-time-label');
      const tempoValorTexto = document.querySelector('.processing-time-value');
      
      if (tempoProcessamentoTexto && data.howItWorks && data.howItWorks.steps && data.howItWorks.steps.step2 && data.howItWorks.steps.step2.processingTimeLabel) {
        tempoProcessamentoTexto.textContent = data.howItWorks.steps.step2.processingTimeLabel;
      }
      
      // Traduzir o valor do tempo de processamento
      if (tempoValorTexto && data.howItWorks && data.howItWorks.steps && data.howItWorks.steps.step2 && data.howItWorks.steps.step2.processingTimeValue) {
        tempoValorTexto.textContent = data.howItWorks.steps.step2.processingTimeValue;
        console.log("Valor do tempo de processamento traduzido para:", data.howItWorks.steps.step2.processingTimeValue);
      }
      
      // 3. Container de taxa de precisão (imagem 3)
      const taxaPrecisaoTexto = document.querySelector('.accuracy-label');
      const taxaValorTexto = document.querySelector('.accuracy-value');
      
      if (taxaPrecisaoTexto && data.howItWorks && data.howItWorks.steps && data.howItWorks.steps.step3 && data.howItWorks.steps.step3.accuracyLabel) {
        taxaPrecisaoTexto.textContent = data.howItWorks.steps.step3.accuracyLabel;
      }
      
      if (taxaValorTexto && data.howItWorks && data.howItWorks.steps && data.howItWorks.steps.step3 && data.howItWorks.steps.step3.accuracyValue) {
        taxaValorTexto.textContent = data.howItWorks.steps.step3.accuracyValue;
        console.log("Valor da taxa de precisão traduzido para:", data.howItWorks.steps.step3.accuracyValue);
      }
      
      // 4. Container de formatos de exportação (imagem 4)
      const formatosExportacaoTexto = document.querySelector('.export-formats-label');
      const formatosExportacaoLista = document.querySelector('.export-formats-list');
      
      if (formatosExportacaoTexto && data.howItWorks && data.howItWorks.steps && data.howItWorks.steps.step4 && data.howItWorks.steps.step4.exportFormatsLabel) {
        formatosExportacaoTexto.textContent = data.howItWorks.steps.step4.exportFormatsLabel;
      }
      
      if (formatosExportacaoLista && data.howItWorks && data.howItWorks.steps && data.howItWorks.steps.step4 && data.howItWorks.steps.step4.exportFormats) {
        formatosExportacaoLista.textContent = data.howItWorks.steps.step4.exportFormats;
      }
      
      console.log("Containers especiais traduzidos com sucesso");
    } catch (error) {
      console.error("Erro ao traduzir containers especiais:", error);
    }
  }

// Executar a tradução quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(traduzirContainersEspeciais, 1000);
});

// Executar a tradução quando as traduções forem carregadas
document.addEventListener('languageLoaded', traduzirContainersEspeciais);

window.changeLanguage = changeLanguage;