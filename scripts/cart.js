let noviPodaci;

//da se stvari sprem i lodaju svakiput kad se stranic apokrene:
// Funkcija za spremanje podataka u lokalni spremnik
function spremiPodatke(data) {
  localStorage.setItem("mojiPodaci", JSON.stringify(data));
  console.log(spremljeniPodaci.categories[0]);
}

// Funkcija za dohvaćanje podataka iz lokalnog spremnika
function dohvatiPodatke() {
  var spremljeniPodaci = localStorage.getItem("mojiPodaci");
  if (spremljeniPodaci !== undefined || spremljeniPodaci !== null) {
    return JSON.parse(spremljeniPodaci);
  } else {
    return null;
  }
}

// Funkcija koja se poziva prilikom prije nego što se stranica napusti
window.addEventListener("beforeunload", function () {
  spremiPodatke(noviPodaci);
});

// Funkcija koja se poziva kada se DOM učita na novoj stranici
document.addEventListener("DOMContentLoaded", function () {
  data = dohvatiPodatke();
  localStorage.clear();
  if (data) {
    noviPodaci = Object.assign({}, data);
    console.log(noviPodaci.ukupanBrojProizvoda);

    //prodi po svim kategorijama i one koji su odabrani dodaj u kosaricu
    dodajKosarici();
  }
});

function dodajKosarici() {
  for (let kategorija of noviPodaci.categories) {
    for (let proizvod of kategorija.products) {
      if (proizvod.kolicina > 0) {
        document.querySelector(".naziv-kosarice").innerHTML = "Košarica";
        stvoriElementDodajProizvod(proizvod);
      }
    }
  }
}

function stvoriElementDodajProizvod(proizvod) {
  let divProizvod = document.createElement("div");
  divProizvod.className = "proizvod";

  let divkonkretnoIme = document.createElement("div");
  divkonkretnoIme.className = "konkrento-ime";

  let divPrijeP = document.createElement("div");
  divPrijeP.innerHTML = proizvod.name;

  divkonkretnoIme.append(divPrijeP);
  divProizvod.append(divkonkretnoIme);

  // 3. redak:
  let divKonkretnaKolicina = document.createElement("div");
  divKonkretnaKolicina.className = "konkretna-kolicina";

  let divMinus = document.createElement("div");
  divMinus.className = "minus";

  let imgMinus = document.createElement("img");
  imgMinus.src = "./images/minus.png";
  imgMinus.id = "minusID";

  divMinus.append(imgMinus);
  divKonkretnaKolicina.append(divMinus);

  console.log(divMinus);

  //brojilo unutra:
  let divBrojilo = document.createElement("div");
  divBrojilo.className = "brojilo-unutra";
  divBrojilo.innerHTML = proizvod.kolicina;

  divKonkretnaKolicina.append(divBrojilo);

  //plus:
  let divPlus = document.createElement("div");
  divPlus.className = "plus";

  let imgPlus = document.createElement("img");
  imgPlus.src = "./images/plus.png";
  imgPlus.id = "plusID";

  divPlus.append(imgPlus);
  divKonkretnaKolicina.append(divPlus);

  //na kraju sve appendam u divProizvod
  divProizvod.append(divKonkretnaKolicina);

  // !!! tu bi nas objekt trebao biti stvoren

  document.querySelector(".k-zajednicki-spremnik").append(divProizvod);

  // opradivanje plusa:

  imgPlus.addEventListener("click", function () {
    povecajZaJedan(imgPlus);
  });

  function povecajZaJedan(plus) {
    let imeProizvoda =
      plus.parentNode.parentNode.previousSibling.firstElementChild.innerHTML;
    console.log(imeProizvoda);
    noviPodaci.categories[findProductInfo(imeProizvoda).categoryIndex].products[
      findProductInfo(imeProizvoda).productIndex
    ].kolicina++;
    noviPodaci.ukupanBrojProizvoda++;
    plus.parentNode.previousSibling.innerHTML =
      noviPodaci.categories[
        findProductInfo(imeProizvoda).categoryIndex
      ].products[findProductInfo(imeProizvoda).productIndex].kolicina;
  }

  // obradiavanje minusa:
  imgMinus.addEventListener("click", function () {
    smanjiZaJedan(imgMinus);
  });

  function smanjiZaJedan(minus) {
    let imeProizvoda =
      minus.parentNode.parentNode.previousSibling.firstElementChild.innerHTML;
    noviPodaci.categories[findProductInfo(imeProizvoda).categoryIndex].products[
      findProductInfo(imeProizvoda).productIndex
    ].kolicina--;
    noviPodaci.ukupanBrojProizvoda--;
    if (
      noviPodaci.categories[findProductInfo(imeProizvoda).categoryIndex]
        .products[findProductInfo(imeProizvoda).productIndex].kolicina == 0
    ) {
      minus.parentNode.parentNode.parentNode.remove();
      document.querySelector(".naziv-kosarice").innerHTML = "Košarica";
    }
    minus.parentNode.nextElementSibling.innerHTML =
      noviPodaci.categories[
        findProductInfo(imeProizvoda).categoryIndex
      ].products[findProductInfo(imeProizvoda).productIndex].kolicina;
  }
}

function findProductInfo(productName) {
  for (let i = 0; i < data.categories.length; i++) {
    const category = data.categories[i];
    const productIndex = category.products.findIndex(
      (product) => product.name === productName
    );
    if (productIndex !== -1) {
      return {
        categoryIndex: i,
        categoryName: category.name,
        productIndex: productIndex, // Dodajemo 1 jer je indeksiranje u JavaScript-u bazirano na 0
      };
    }
  }
  // Ako proizvod nije pronađen, vraćamo null
  return null;
}
