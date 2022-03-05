document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});

const iniciarApp = () => {
  crearGaleria();
  scrollNav();
};

const navegacionFija = () => {
  const barraNavegacion = document.querySelector(".header");
  const invitados = document.querySelector(".conenido-main");

  window.addEventListener("scroll", () => {
    if (invitados.getBoundingClientRect().bottom < 0) {
      barraNavegacion.classList.add("fixed");
    } else {
      barraNavegacion.classList.remove("fixed");
    }
  });
};

const scrollNav = () => {
  const enlaces = document.querySelectorAll(".navegacion-princiapl a");

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();
      const seccionScroll = e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
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

  const overlay = document.createElement("div");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");

  const cerrarImg = document.createElement("input");
  cerrarImg.value = "Cerrar";
  cerrarImg.type = "submit";
  cerrarImg.classList.add("btn-cerrar");

  cerrarImg.onclick = () => {
    overlay.remove("verlay");
  };

  overlay.appendChild(cerrarImg);

  const body = document.querySelector("body");
  body.appendChild(overlay);
};
