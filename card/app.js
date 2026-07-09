document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // DOM ELEMENTS
    // ==========================================================================
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const interactiveCard = document.getElementById('interactive-card');
    const toast = document.getElementById('toast');
    const downloadVCardBtn = document.getElementById('download-vcard');
    const shareCardBtn = document.getElementById('share-card');
    
    // Modal Elements
    const qrModal = document.getElementById('qr-modal');
    const modalCloseOverlay = document.getElementById('modal-close-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const shareUrlInput = document.getElementById('share-url-input');
    const copyUrlBtn = document.getElementById('copy-url-btn');
    const qrcodeContainer = document.getElementById('qrcode');

    // ==========================================================================
    // THEME SWITCHER (DARK / LIGHT MODE)
    // ==========================================================================
    // Initialize Theme
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        body.className = savedTheme;
    } else {
        body.className = systemPrefersDark ? 'dark-theme' : 'light-theme';
    }

    // Toggle Action
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.className = 'light-theme';
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.className = 'dark-theme';
            localStorage.setItem('theme', 'dark-theme');
        }
    });

    // ==========================================================================
    // TOAST UTILITY
    // ==========================================================================
    let toastTimeout;
    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }

    // ==========================================================================
    // CLIPBOARD COPY SYSTEM
    // ==========================================================================
    const copyButtons = document.querySelectorAll('.action-btn.copy');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop card click triggers
            
            const targetText = button.getAttribute('data-copy');
            if (!targetText) return;

            navigator.clipboard.writeText(targetText)
                .then(() => {
                    // Success visual response
                    button.classList.add('success');
                    showToast('Phone number copied!');
                    
                    setTimeout(() => {
                        button.classList.remove('success');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                    showToast('Failed to copy. Please try again.');
                });
        });
    });

    // ==========================================================================
    // VCARD (.VCF) CONTACT EXPORTER
    // ==========================================================================
    downloadVCardBtn.addEventListener('click', () => {
        // vCard Version 3.0 Details
        const vcardContent = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            'FN:John Abrahm Zapico',
            'N:Zapico;John;Abrahm;;',
            'TEL;TYPE=CELL,VOICE;VALUE=uri:tel:09761220681',
            'TEL;TYPE=CELL,VOICE;VALUE=uri:tel:09466956370',
            'NOTE:Instagram: @jnabzp | Facebook: John Abrahm Zapico',
            'X-SOCIALPROFILE;TYPE=instagram:https://instagram.com/jnabzp',
            'X-SOCIALPROFILE;TYPE=facebook:https://www.facebook.com/search/top/?q=john%20abrahm%20zapico',
            'END:VCARD'
        ].join('\r\n');

        // Create Blob & BlobURL
        const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
        const blobUrl = URL.createObjectURL(blob);
        
        // Dynamic Anchor element
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', 'John_Abrahm_Zapico.vcf');
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        // Clean up DOM
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
        
        showToast('Contact file ready! Saving...');
    });

    // ==========================================================================
    // SHARING MODAL & QR CODE RENDERER
    // ==========================================================================
    let qrInstance = null;
    const currentURL = window.location.href;
    
    // Set URL field
    shareUrlInput.value = currentURL;

    // Open Modal Click
    shareCardBtn.addEventListener('click', () => {
        qrModal.classList.add('active');
        qrModal.setAttribute('aria-hidden', 'false');
        
        // Render QR Code once CDN library is loaded
        if (typeof QRCode !== 'undefined' && !qrInstance) {
            qrcodeContainer.innerHTML = ''; // Clear fallback contents
            qrInstance = new QRCode(qrcodeContainer, {
                text: currentURL,
                width: 160,
                height: 160,
                colorDark : body.classList.contains('dark-theme') ? "#0F172A" : "#0F172A",
                colorLight : "#FFFFFF",
                correctLevel : QRCode.CorrectLevel.M
            });
        }
    });

    // Close Modal Functions
    const closeModal = () => {
        qrModal.classList.remove('active');
        qrModal.setAttribute('aria-hidden', 'true');
    };

    modalCloseBtn.addEventListener('click', closeModal);
    modalCloseOverlay.addEventListener('click', closeModal);
    
    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && qrModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Copy current URL inside modal
    copyUrlBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(currentURL)
            .then(() => {
                copyUrlBtn.textContent = 'Copied!';
                copyUrlBtn.style.backgroundColor = '#10B981';
                showToast('Card link copied!');
                
                setTimeout(() => {
                    copyUrlBtn.textContent = 'Copy Link';
                    copyUrlBtn.style.backgroundColor = '';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy URL: ', err);
                showToast('Failed to copy URL.');
            });
    });

    // ==========================================================================
    // PREMIUM 3D TILT EFFECT (DESKTOP ONLY)
    // ==========================================================================
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (!isMobile) {
        interactiveCard.addEventListener('mousemove', (e) => {
            const cardRect = interactiveCard.getBoundingClientRect();
            
            // Mouse pointer offset relative to card
            const mouseX = e.clientX - cardRect.left;
            const mouseY = e.clientY - cardRect.top;
            
            // Normalize offsets around center of card (-0.5 to 0.5)
            const xPercent = (mouseX / cardRect.width) - 0.5;
            const yPercent = (mouseY / cardRect.height) - 0.5;
            
            // Max rotation degrees
            const maxRotation = 12;
            
            // Rotate card based on position
            const rotateX = (-yPercent * maxRotation).toFixed(2);
            const rotateY = (xPercent * maxRotation).toFixed(2);
            
            interactiveCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
            interactiveCard.style.transition = 'transform 0.05s ease';
        });
        
        interactiveCard.addEventListener('mouseleave', () => {
            // Reset position on leave
            interactiveCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            interactiveCard.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
        });
    }
});
