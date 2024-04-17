const loader = document.querySelector(".loader-container"); // Sélectionne l'élément HTML avec la classe 'loader-container' pour manipuler l'affichage du chargeur
const errorInformation = document.querySelector(".error-information"); // Sélectionne l'élément pour afficher les messages d'erreur

async function getWeatherData(){ // Définit une fonction asynchrone pour récupérer les données météorologiques
  try {
    const response = await fetch("http://api.airvisual.com/v2/nearest_city?key=4d1fe85b-a0cb-4e15-8af3-317c41870f06") // Envoie une requête GET à l'API pour obtenir les données de la ville la plus proche

    if(!response.ok) { // Vérifie si la réponse n'est pas réussie
      throw new Error(`Error ${response.status}, ${response.statusText}`) // Lance une exception avec le statut et le texte de l'erreur
    }

    const responseData = await response.json(); // Convertit la réponse en format JSON
    
    const sortedData = { // Structure les données pertinentes en un objet
      city: responseData.data.city, // Récupère le nom de la ville
      country: responseData.data.country, // Récupère le nom du pays
      iconId: responseData.data.current.weather.ic, // Récupère l'identifiant de l'icône météorologique
      temperature: responseData.data.current.weather.tp, // Récupère la température actuelle
    }

    populateUI(sortedData) // Appelle la fonction pour peupler l'interface utilisateur avec les données triées
  }
  catch (error) { // Capture les erreurs lors de l'exécution de la requête
    loader.classList.remove("active"); // Désactive l'affichage du chargeur
    errorInformation.textContent = error.message; // Affiche le message d'erreur
  }
}
getWeatherData() // Appelle la fonction pour obtenir les données météorologiques dès que le script est chargé


const cityName = document.querySelector(".city-name"); // Sélectionne l'élément pour afficher le nom de la ville
const countryName = document.querySelector(".country-name"); // Sélectionne l'élément pour afficher le nom du pays
const temperature = document.querySelector(".temperature"); // Sélectionne l'élément pour afficher la température
const infoIcon = document.querySelector(".info-icon"); // Sélectionne l'élément pour afficher l'icône d'information

function populateUI(data){ // Définit une fonction pour remplir l'interface utilisateur avec les données
  cityName.textContent = data.city; // Affiche le nom de la ville
  countryName.textContent = data.country; // Affiche le nom du pays
  temperature.textContent = `${data.temperature}°`; // Affiche la température avec le symbole degré
  infoIcon.src = `ressources/icons/${data.iconId}.svg`; // Définit le chemin d'accès pour l'icône de l'info
  infoIcon.style.width = "150px"; // Définit la largeur de l'icône
  loader.classList.remove("active"); // Désactive l'affichage du chargeur après le chargement des données
}
