document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});

const iniciarApp = () => {
  crearGaleria();
};

const crearGaleria = () => {
  const galeria = document.querySelector(".galeria-img");
  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `
            <picture>
                <source srcset="./build/img/thumb/${i}.webp" type="image/webp" />
                <img src="./build/img/thumb/${i}.jpg" alt="" />
            </picture>
        
        `;
    imagen.onclick = () => {
      mostrarImagen(i);
    };
    galeria.appendChild(imagen);
  }
};

const mostrarImagen = (indice) => {
  const imagen = document.createElement("picture");
  imagen.innerHTML = `
        <picture>
            <source srcset="./build/img/grande/${indice}.webp" type="image/webp" />
            <img src="./build/img/grande/${indice}.jpg" alt="" />
        </picture>
    
    `;

    const overlay = document.createElement('div')
    overlay.appendChild(imagen)
    overlay.classList.add('overlay')

    const cerrarImg = document.createElement('input');
    cerrarImg.value = "Cerrar";
    cerrarImg.type = "submit"
    cerrarImg.classList.add('btn-cerrar');

    cerrarImg.onclick = () => {
        overlay.remove('verlay')
      };

    overlay.appendChild(cerrarImg);

    const body = document.querySelector('body')
    body.appendChild(overlay);
};
