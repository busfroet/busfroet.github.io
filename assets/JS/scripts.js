const navKnapp = document.getElementById('nav-knapp');
const gridContainer = document.querySelector('.grid-container');
const pilNav = document.getElementById('pil-nav');
const fällbarMeny = document.querySelector('.fällbar-meny');
const logo = document.querySelector('.logo');

let isExpanded = false;

navKnapp.addEventListener('click', function() {
    if (window.innerWidth > 992) {
        if (!isExpanded) {
            gridContainer.style.gridTemplateAreas = `"m"`;
            pilNav.style.transform = 'scaleX(-1)';
            fällbarMeny.style.display = 'none';
            isExpanded = true;
        } else {
            gridContainer.style.gridTemplateAreas = `"n m m m m m m m m m"`;
            pilNav.style.transform = 'scaleX(1)';
            fällbarMeny.style.display = 'flex';
            isExpanded = false;
        }
    } else {
        if (!isExpanded) {
            gridContainer.style.gridTemplateAreas = `" m"`;
            pilNav.style.transform = 'scaleX(-1)';
            isExpanded = true;
        } else {
            gridContainer.style.gridTemplateAreas = `"n m m m m m"`;
            pilNav.style.transform = 'scaleX(1)';
            logo.style.marginLeft = '0';
            isExpanded = false;
        }
    }
});
