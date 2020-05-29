// Подключение стронних библиотек

//import 'vue'
//import Vue from 'vue' - если мы дальше будем использовать Vue, как переменную или функцию в коде
//window.Vue = require('vue)

//import 'bootstrap/.../bootstrap.css' 
//import Bootstrap from 'bootstrap/.../bootstrap.css' - если будем с ним взаимодействовать


// JS 
//import './js/script';

// SCSS
//import './scss/style.scss';

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

requireAll(require.context('../src/', true, /\.js$|\.scss$/));



