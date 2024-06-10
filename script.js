/* 
bug: "#26de81"
dragon: "#ffeaa7",
electric: "#fed330",
fairy: "#FF0069",
fighting: "#30336b",
fire: "#f0932b",
flying: "#81ecec",
grass: "#00b894",
ground: "#EFB549",
ghost: "#a55eea",
ice: "#74b9ff",
normal: "#95afc0",
poison: "#6c5ce7",
psychic: "#a29bfe",
rock: "#2d3436",
water: "#0190FF",
*/

const typeColor = {
  all: "#28282b",
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};
const Data = [];
const url = "https://pokeapi.co/api/v2/pokemon/";
const cardCnt = document.getElementById("card-container");

let getPokeData = () => {
  //Generating a random number between 1 and 150
  for (let i = 1; i <= 150; i++) {
    const finalUrl = url + i;
    // Fetch Generated URL
    fetch(finalUrl)
      .then((response) => response.json())
      .then((data) => {
        generateCard(data);
        Data.push(data);
        // console.log(data);
      });
  }
};
console.log(Data);
// Generate Card
let generateCard = async (data) => {
  //Get necessary data and assign it to variable
  console.log("data:", data);
  const hp = data.stats[0].base_stat;
  //   console.log(hp);
  const card = document.createElement("div");
  card.classList.add("card");
  const imgSrc = data.sprites.other.dream_world.front_default;
  const pokname = data.name[0].toUpperCase() + data.name.slice(1);
  const statAttack = data.stats[1].base_stat;
  const statDefence = data.stats[2].base_stat;
  const statSpeed = data.stats[5].base_stat;
  //Set Themecolor based on pokemon types
  const themeColor = typeColor[data.types[0].type.name];
  console.log(themeColor);

  card.innerHTML = `
  <div class="flip-card-front">
    <p class="hp">
      <span>HP</span> ${hp}</p>
<img src=${imgSrc} alt="Pockemon Image">
<h2 class="poke-name">${pokname}</h2>
<div class="types">
   ${data.types
     .map((item) => {
       return `<span style="background-color:${
         typeColor[item.type.name]
       }">${item.type.name.toUpperCase()}</span>`;
     })
     .join(" ")}
</div>
<div class="stats">

  <div class="">
    <h3>${statAttack}</h3>
    <p>Attack</p>
  </div>

  <div class="">
    <h3>${statDefence}</h3>
    <p>Defense</p>
  </div>

  <div class="">
    <h3>${statSpeed}</h3>
    <p>Speed</p>
  </div>
</div>
   </div>
   
    <div class="flip-card-back" >
     <img src="${data.sprites.other.showdown.front_default}">
      <h4 style="margin-top:60px;">Abilities:</h4> 
      <p> ${data.abilities
        .map((item) => {
          return `<span style="background-color:${themeColor}" >${item.ability.name.toUpperCase()}</span>`;
        })
        .join(" ")}</p> 
        <div>
      <h4>Weight: <span>${data.weight} lb</span></h4>
      <h4>Height: <span>${data.height} cm</span></h4>
      </div>
    </div>
    
    `;
  console.log(data.weight);
  card.style.background = `radial-gradient( circle at 50% 0%, ${themeColor} 36%, #ffffff 36%)`;
  // appendTypes(data.types);

  // styleCard(themeColor);
  cardCnt.appendChild(card);
};

let appendTypes = (types) => {
  //   console.log(types);
  types.forEach((item) => {
    let span = document.createElement("SPAN");
    span.textContent = item.type.name.toUpperCase();
    // console.log(span);
    document.querySelector(".types").appendChild(span);
  });
};

let styleCard = (color) => {
  card.style.background = `radial-gradient( circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
  card.querySelectorAll(".types span").forEach((typeColor) => {
    typeColor.style.backgroundColor = color;
  });
};

window.addEventListener("load", getPokeData);

// search functions
let open = false;

document
  .querySelector(".search-container img")
  .addEventListener("click", () => {
    if (!open) {
      document.querySelector(".search-container input").style.width = "100%";
      document.querySelector(".search-container img").style.right = "42px";
      document.querySelector(".search-container img").style.transform =
        "rotate(360deg)";
      document.querySelector(".search-container input").style.opacity = "1";
      document.querySelectorAll(".search-container p").forEach((e) => {
        e.style.opacity = "0";
      });

      open = true;
    } else {
      document.querySelector(".search-container input").style.width = "0%";
      document.querySelector(".search-container input").style.opacity = "0";
      document.querySelector(".search-container img").style.transform =
        "rotate(0deg)";
      document.querySelectorAll(".search-container p").forEach((e) => {
        e.style.opacity = "1";
      });

      const filterData = Data.filter((e) =>
        e.name.includes(
          document.getElementById("poke-search").value.toLowerCase()
        )
      );
      console.log(filterData);
      cardCnt.innerHTML = "";
      filterData.map((e) => {
        generateCard(e);
      });
      document.querySelectorAll(".sidebar .types div p").forEach((e) => {
        e.style.cssText = "";
      });
      open = false;
    }
  });

for (a in typeColor) {
  type = document.createElement("div");
  type.innerHTML = `<p>${a}</p>`;
  document.querySelector(".types").appendChild(type);
}
document.querySelectorAll(".sidebar .types div p").forEach((item) => {
  item.addEventListener("click", (ele) => {
    document.querySelectorAll(".sidebar .types div p").forEach((e) => {
      e.style.cssText = "";
    });
    // console.log(Data[0].types.filter((e) => e.type.name.includes("grass")));
    cardCnt.innerHTML = "";
    const filterdata = Data.filter((item) => {
      if (ele.target.innerHTML == "all") return item;
      if (item.types.find((e) => e.type.name == ele.target.innerHTML))
        return item;
    });

    filterdata.map((e) => {
      generateCard(e);
    });
    // generateCard(filterdata);
    ele.target.style.backgroundColor = `${typeColor[ele.target.innerHTML]}`;
    item.style.width = `100%`;
    item.style.color = `white`;
  });
});
