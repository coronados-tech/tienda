import rafaelFoto from "../assets/profile.images/rafael.png";
import micaelaFoto from "../assets/profile.images/micaela.png";
import carlaFoto from "../assets/profile.images/carla.png";

export const integrantes = [
    {
        id: 1,
        nombre: "Carla Andrea",
        apellido: "Perez",
        dni: "34.259.069",
        foto: carlaFoto,
        fotoPosicion: "center 18%",
        redes: [
            { nombre: "LinkedIn", url: "https://www.linkedin.com/in/carlaaperez/" },
            { nombre: "GitHub", url: "https://github.com/carlaprz" },
        ],
    },
    {
        id: 2,
        nombre: "Malena Celeste",
        apellido: "Fernandez Mansilla",
        dni: "41.234.567",
        foto: "https://i.pravatar.cc/200?img=12",
        redes: [{ nombre: "GitHub", url: "https://github.com/CelesteFernandez" }],
    },
    {
        id: 3,
        nombre: "Micaela Natalia",
        apellido: "Signorello",
        dni: "38.624.940",
        foto: micaelaFoto,
        redes: [
            {
                nombre: "LinkedIn",
                url: "https://www.linkedin.com/in/micaela-signorello-a2128a29b/",
            },
            { nombre: "GitHub", url: "https://github.com/MicaelaSignorello" },
        ],
    },
    {
        id: 4,
        nombre: "Rafael Alberto",
        apellido: "Barberi Salcedo",
        dni: "95.151.120",
        foto: rafaelFoto,
        redes: [
            {
                nombre: "LinkedIn",
                url: "https://www.linkedin.com/in/rafael-barberi-informatica/",
            },
            { nombre: "GitHub", url: "https://github.com/RafaelBarberiS" },
            { nombre: "Instagram", url: "https://www.instagram.com/raffa_beri/" },
        ],
    },
];
