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
