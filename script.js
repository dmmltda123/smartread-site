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
