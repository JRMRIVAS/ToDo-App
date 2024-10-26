const themeSelector = document.getElementById('theme-selector');

themeSelector.addEventListener('change', function () {
    const selectedTheme = themeSelector.value;
    document.body.className = '';  // Remover clases anteriores

    if (selectedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else if (selectedTheme === 'custom') {
        document.body.classList.add('custom-theme-1');
    } else if (selectedTheme === 'custom2') {
        document.body.classList.add('custom-theme-2');
    } else {
        return
    }
});


