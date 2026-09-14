// Função para aplicar o tema e salvar no localStorage
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
      themeSelect.value = theme;
    }
  }
  
  // Lógica executada quando o DOM estiver pronto
  document.addEventListener('DOMContentLoaded', () => {
    // 1. CARREGAR E SINCRONIZAR TEMA
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
  
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => {
        applyTheme(e.target.value);
      });
    }
  
    // 2. FAQ INTERATIVO
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
      });
    });
  
    // 3. CALCULADORA DE IMPACTO
    const calcForm = document.getElementById('eco-calculator');
    if (calcForm) {
      calcForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const km = parseFloat(document.getElementById('km-input').value) || 0;
        const days = parseFloat(document.getElementById('days-input').value) || 0;
  
        const co2Avoided = (km * days * 0.084).toFixed(1);
        const plasticReused = (km * days * 0.015).toFixed(1);
  
        document.getElementById('res-co2').textContent = `${co2Avoided} kg`;
        document.getElementById('res-plastic').textContent = `${plasticReused} kg`;
      });
    }
  
    // 4. FORMULÁRIO DE CONTATO (ENVIO REAL VIA FORMSPREE)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const btnSubmit = document.getElementById('btn-submit');
  
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const data = new FormData(contactForm);
        if (btnSubmit) btnSubmit.disabled = true;
  
        try {
          const response = await fetch(contactForm.action, {
            method: contactForm.method,
            body: data,
            headers: {
              'Accept': 'application/json'
            }
          });
  
          if (response.ok) {
            if (formStatus) {
              formStatus.className = 'form-status success';
              formStatus.style.display = 'block';
              formStatus.style.opacity = '1';
              formStatus.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
            }
            contactForm.reset();
          } else {
            const errorData = await response.json();
            if (formStatus) {
              formStatus.className = 'form-status';
              formStatus.style.display = 'block';
              formStatus.style.color = '#721c24';
              formStatus.style.backgroundColor = '#f8d7da';
              formStatus.textContent = errorData.errors ? errorData.errors.map(err => err.message).join(', ') : 'Ocorreu um erro ao enviar.';
            }
          }
        } catch (error) {
          if (formStatus) {
            formStatus.className = 'form-status';
            formStatus.style.display = 'block';
            formStatus.style.color = '#721c24';
            formStatus.style.backgroundColor = '#f8d7da';
            formStatus.textContent = 'Erro de rede ao tentar enviar a mensagem.';
          }
        } finally {
          if (btnSubmit) btnSubmit.disabled = false;
        }
      });
    }
  });