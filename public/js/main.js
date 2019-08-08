/*

    Main points del workshop:
        - window.onscroll permite asociar efectos de scroll reactivos a la interfaz
        - Dentro del mismo, la propiedad window.scrollY retorna la diferencia entre el top del documento y del viewport
        - El método obj.getBoundingClientRect().top retorna la diferencia entre el top del objeto y el top del viewport
        - La propiedad transform de CSS, con sus valores translate(), rotate(), scale()... viabilida la manipulación tridimensional y espacial de los elementos

    Crear una escena de trazado con SVG:
        - Abrir una imagen con un software de vectorizado
        - Crear trazados vectorales sobre la imagen
        - Exportar todo en formato SVG (ojo! seleccionar "enlazar imagen", no "incrustar imagen")
        - Pegar el código SVG en el HTML y re-enlazar el src de la imagen al archivo de imagen local
        - Ocultar la imagen con CSS (etiqueta IMG dentro del SVG, no todo el SVG)
        - Configurar VivusSVG para que trace las líneas, y asociar un callback que muestre la imagen previamente ocultada
*/


(function () {

  let winScroll;
  const navigation = document.querySelector('.navigation')


  // SVG watch scene
  // new Vivus('relojSVG', { duration: 120, type: 'oneByOne', animTimingFunction: Vivus.EASE }, () => relojSVG.classList.add('done'))

  // Scroll navigation links
  // const scrollButtons = document.querySelectorAll('.scrollto');
  // for (let elm of scrollButtons) {
  //     elm.onclick = e => {
  //         e.preventDefault()
  //         const href = elm.getAttribute('href');
  //         document.querySelector(href).scrollIntoView({
  //             behavior: 'smooth'
  //         });
  //     }
  // }


  // Scroll effects
  window.onscroll = () => {

      winScroll = window.scrollY

       // Reveal effects
       document.querySelectorAll('.reveal').forEach(el => {
        isInViewport(el) ? el.classList.add('visible2') : el.classList.remove('visible2')
    })

      // Navbar morph
      winScroll > 100 ?
      navigation.classList.add('sticky') :
      navigation.classList.remove('sticky')
      
  }



})();