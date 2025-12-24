document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.querySelector('.back-btn');
    backBtn.addEventListener('click', () => {
        window.location.href = 'https://www.google.com.br';
    });

    const menuBtn = document.querySelector('.menu-btn');
    menuBtn.addEventListener('click', () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('open');
    });
});
