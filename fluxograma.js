function ativarBloco(id) {
    const bloco = document.getElementById(id);
    bloco.classList.remove('disabled');
    bloco.classList.add('active');
}

function desativarBloco(id) {
    const bloco = document.getElementById(id);
    bloco.classList.remove('active');
    bloco.classList.add('disabled');
}

function desenharLinha(id, x1, y1, x2, y2) {
    const linha = document.getElementById(id);
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    linha.style.width = `${length}px`;
    linha.style.left = `${x1}px`;
    linha.style.top = `${y1}px`;
    linha.style.transform = `rotate(${angle}deg) scaleX(1)`;
    linha.classList.add('active');
}

function limparLinhas() {
    document.querySelectorAll('.linha').forEach(linha => {
        linha.classList.remove('active');
        linha.style.transform = 'scaleX(0)';
    });
}

function iniciarAnimacao() {
    // Reset inicial
    document.querySelectorAll('.bloco').forEach(bloco => {
        bloco.classList.remove('active');
        bloco.classList.add('disabled');
    });
    limparLinhas();

    // Sequência de animação
    setTimeout(() => {
        ativarBloco('bloco1');
    }, 1000);

    // Bloco 2
    setTimeout(() => {
        desenharLinha('linha1', 114, 82, 150, 150);
        ativarBloco('bloco2');
    }, 2000);

    setTimeout(() => {
        desativarBloco('bloco1');
    }, 5000);

    // Bloco 3
    setTimeout(() => {
        desenharLinha('linha2', 214, 182, 250, 250);
        ativarBloco('bloco3');
    }, 6000);

    setTimeout(() => {
        desativarBloco('bloco2');
    }, 9000);

    // Bloco 4 (permanece ativo)
    setTimeout(() => {
        desenharLinha('linha3', 314, 82, 350, 150);
        ativarBloco('bloco4');
    }, 10000);

    // Sub-blocos do Excel (Bloco 5)
    setTimeout(() => {
        desenharLinha('linha4', 414, 182, 450, 250);
        ativarBloco('bloco5-1');
    }, 12000);

    setTimeout(() => {
        ativarBloco('bloco5-2');
    }, 14000);

    setTimeout(() => {
        ativarBloco('bloco5-3');
    }, 16000);

    // Bloco 6
    setTimeout(() => {
        desenharLinha('linha5', 514, 282, 450, 350);
        ativarBloco('bloco6');
    }, 19000);

    // Reiniciar após a sequência completa
    setTimeout(() => {
        iniciarAnimacao();
    }, 25000);
}

// Iniciar a animação quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    iniciarAnimacao();
    
    // Adicionar efeito de hover nos blocos
    document.querySelectorAll('.bloco').forEach(bloco => {
        bloco.addEventListener('mouseenter', () => {
            if (bloco.classList.contains('active')) {
                const linhas = document.querySelectorAll('.linha.active');
                linhas.forEach(linha => {
                    linha.style.opacity = '0.3';
                });
            }
        });
        
        bloco.addEventListener('mouseleave', () => {
            const linhas = document.querySelectorAll('.linha.active');
            linhas.forEach(linha => {
                linha.style.opacity = '1';
            });
        });
    });

    // Animar a legenda
    setTimeout(() => {
        document.querySelector('.fluxograma-legend').classList.add('visible');
    }, 500);
}); 