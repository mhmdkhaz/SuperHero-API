let TapContainer = document.querySelector(".list .ContentInfromation");
let TapList = document.querySelectorAll(".list .Tap li");
let BeforeStarted = document.querySelector(".BeforeStarted");
let ContainerImgMain = document.querySelector(".NameSuper");
let TapListSpan = document.querySelectorAll(".list .Tap li span");
let TapInformation = document.querySelectorAll(".TapBodySingle");
let SearchValue = document.querySelector(".SuperHero input");
let searchList = document.querySelector(".search-list");
const cursor = document.querySelector(".cursor");
const loader = document.querySelector(".contetnLoader");
const loaderskchase = document.querySelector(".contetnLoader .sk-chase");

// loader
let TimeLoader = () => {
  setTimeout(() => {
    loader.style.width = "0";
    loader.style.opacity = ".8";
    loaderskchase.style.width = "0";
  }, 2500);
};

// cursor
document.addEventListener("mousemove", (e) => {
  cursor.setAttribute(
    "style",
    "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;"
  );
});

document.addEventListener("click", () => {
  cursor.classList.add("expand");

  setTimeout(() => {
    cursor.classList.remove("expand");
  }, 500);
});

// remove and add class active in tap
let RemoveAddActiveTap = () => {
  TapListSpan.forEach((ListElement) => {
    ListElement.onclick = () => {
      TapListSpan.forEach((RemoveClass) => {
        RemoveClass.classList.remove("active"); //remove active class every class after click
      });
      ListElement.classList.add("active"); //add active class after click
    };
  });
};

// add display none in every TapBodySingle box
let AddClassHide = () => {
  TapInformation.forEach((BoxInformation) => {
    BoxInformation.classList.add("HideElement");
  });
};

// show and hide element
let RemoveClassHide = () => {
  AddClassHide();
  TapInformation[0].classList.remove("HideElement");
};

// animation name super
let AnimtaionName = () => {
  // list item
  TapContainer.style.transform = "scale(1)";
  // img hero
  ContainerImgMain.style.transform = "scale(1)";
  // hello
  BeforeStarted.style.opacity = "0";
};

// show box after click tap list
let ShowElementAfterClickTap = () => {
  RemoveAddActiveTap();
  TapList.forEach((box) => {
    box.onclick = () => {
      AddClassHide();
      document.querySelector(box.dataset.show).classList.remove("HideElement");
    };
  });
};

const Init = () => {
  RemoveClassHide();
  ShowElementAfterClickTap();
  TimeLoader();
};

window.addEventListener("reload", Init());

let fetchAllSuperHero = async () => {
  let url = `https://www.superheroapi.com/api.php/727054372039115/search/${SearchValue.value}`;
  try {
    const response = await fetch(url);
    allData = await response.json();
    if (allData.response === "success") {
      ForEachElementData(allData.results);
    }
    searchList.style.visibility = "visible";
  } catch (error) {
    console.log("error");
  }
};

SearchValue.onkeyup = () => {
  fetchAllSuperHero();
};

let ForEachElementData = (data) => {
  data.forEach((dataItem) => {
    showSearchList(dataItem);
    ClickListSearchGetData();
  });
};

let showSearchList = (DataAccses) => {
  let SeachList = document.querySelector(".search-list");
  let MyDiv = document.createElement("div");
  MyDiv.className = "search-list-item";
  MyDiv.innerHTML = `
          <img src = "${
            DataAccses.image.url ? DataAccses.image.url : ""
          }" alt = "">
          <p data-id = "${DataAccses.id}" style="color:#fff;">${
    DataAccses.name
  }</p>
      `;
  SeachList.appendChild(MyDiv);
};

let ClickListSearchGetData = () => {
  let ListItems = document.querySelectorAll(".search-list-item");

  ListItems.forEach((HeroSelection) => {
    HeroSelection.onclick = () => {
      AnimtaionName();
      // hide list item for search
      searchList.style.visibility = "hidden";
      let GetNameSuper = HeroSelection.children[1].textContent;
      let DataInformationApi = `https://www.superheroapi.com/api.php/727054372039115/search/${GetNameSuper}`;
      validityAndTransfer(DataInformationApi);
    };
  });
};

let validityAndTransfer = async (NameSuperHero) => {
  try {
    const response = await fetch(NameSuperHero);
    DataInfo = await response.json();
    if (DataInfo.response === "success") {
      let DataResults = DataInfo.results;
      AddInformationInBoxUseApi(DataResults);
    }
  } catch (error) {
    console.log("error");
  }
};

let AddInformationInBoxUseApi = (data) => {
  document.querySelector(".ImgHero").src = `${data[0].image.url}`;
  ContainerImgMain.textContent = `${data[0].name}`;

  // add info powerstats

  document.querySelector(".powerstats ul").innerHTML = `
                <li>
                  <div class="IconText">
                    <i class="fa-solid fa-shield-halved"></i>
                    <span>intelligence</span>
                  </div>
                  <span class="number">${data[0].powerstats.intelligence}</span>
                </li>

                <li>
                  <div class="IconText">
                    <i class="fa-solid fa-shield-halved"></i>
                    <span>strength</span>
                  </div>
                  <span class="number">${data[0].powerstats.strength}</span>
                </li>

                <li>
                  <div class="IconText">
                    <i class="fa-solid fa-shield-halved"></i>
                    <span>speed</span>
                  </div>
                  <span class="number">${data[0].powerstats.speed}</span>
                </li>

                <li>
                  <div class="IconText">
                    <i class="fa-solid fa-shield-halved"></i>
                    <span>durability</span>
                  </div>
                  <span class="number">${data[0].powerstats.durability}</span>
                </li>

                <li>
                  <div class="IconText">
                    <i class="fa-solid fa-shield-halved"></i>
                    <span>power</span>
                  </div>
                  <span class="number">${data[0].powerstats.power}</span>
                </li>

                <li>
                  <div class="IconText">
                    <i class="fa-solid fa-shield-halved"></i>
                    <span>combat</span>
                  </div>
                  <span class="number">${data[0].powerstats.combat}</span>
                </li>
  `;
  // biography
  document.querySelector(".biography ul").innerHTML = `
                <li>
                  <span class="">full name</span>
                  <span>${data[0].biography["full-name"]}</span>
                </li>

                <li>
                  <span class="">alter-egos</span>
                  <span>${data[0].biography["alter-egos"]}</span>
                </li>

                <li>
                  <span class="">Aliases </span>
                  <span>${data[0].biography["aliases"][0]}</span>
                </li>

                <li>
                  <span class="">place-of-birth</span>
                  <span>${data[0].biography["place-of-birth"]}</span>
                </li>

                <li>
                  <span class="">first-appearance</span>
                  <span>${data[0].biography["first-appearance"]}</span>
                </li>

                <li>
                  <span class=""></span>
                  <span>${data[0].biography["alignment"]}</span>
                </li>
  `;

  document.querySelector(".appearance ul").innerHTML = `
                <li>
                  <div class="IconText">
                    <i class="fas fa-star"></i>
                    <span>GENDER</span>
                  </div>
                  <span class="inforamtion">${data[0].appearance.gender}</span>
                </li>

              <li>
                  <div class="IconText">
                    <i class="fas fa-star"></i>
                    <span>race</span>
                  </div>
                  <span class="inforamtion">${data[0].appearance.race}</span>
                </li>

                <li>
                  <div class="IconText">
                    <i class="fas fa-star"></i>
                    <span>height</span>
                  </div>
                  <span class="inforamtion">${data[0].appearance.height[0]}</span>
                </li>

                <li>
                  <div class="IconText">
                    <i class="fas fa-star"></i>
                    <span>weight</span>
                  </div>
                  <span class="inforamtion">${data[0].appearance.weight[0]}</span>
                </li>

                <li>
                  <div class="IconText">
                    <i class="fas fa-star"></i>
                    <span>eye-color</span>
                  </div>
                  <span class="inforamtion">${data[0].appearance["eye-color"]}</span>
                </li>

                <li>
                  <div class="IconText">
                    <i class="fas fa-star"></i>
                    <span>hair-color</span>
                  </div>
                  <span class="inforamtion">${data[0].appearance["hair-color"]}</span>
                </li>
  `;
  document.querySelector(".connections ul").innerHTML = `
                <li>
                  <span>group--affiliation</span>
                  <span>${data[0].connections["group-affiliation"]}</span>
                </li>
                
                <li>
                  <span>relatives</span>
                  <span>${data[0].connections["relatives"]}</span>
                </li>
  `;
};
