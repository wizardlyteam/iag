const names = [];

const portfolioItems = document.querySelectorAll(".portfolio-item");
const portfilioContainer = document.querySelector(".be-portfolio-container");
const locations = [
  ...new Set(
    Array.from(document.querySelectorAll(".portfolio-item-cats span"))
      .filter(
        (e) =>
          e.textContent !== " · " &&
          e.textContent.includes(",") &&
          !e.textContent.includes("Featured")
      )
      .map((e) => e.textContent)
  ),
];
const industries = [
  ...new Set(
    Array.from(document.querySelectorAll(".portfolio-item-cats span"))
      .filter(
        (e) =>
          e.textContent !== " · " &&
          !e.textContent.includes(",") &&
          !e.textContent.includes("Featured")
      )
      .map((e) => e.textContent)
  ),
];

const locationOptions = locations.map(
  (l) => `<option value="${l}">${l}</option>`
);
const industryOptions = industries.map(
  (l) => `<option value="${l}">${l}</option>`
);

const locationSelect = document.querySelector("#location-select");
locationSelect.insertAdjacentHTML("beforeend", locationOptions);

const industrySelect = document.querySelector("#industry-select");
industrySelect.insertAdjacentHTML("beforeend", industryOptions);

const nameSearch = document.querySelector("#name-search");

function handleLocationSelect(e) {
  portfolioItems.forEach((e) => {
    e.remove();
  });

  if (e.target.value === "") {
    portfolioItems.forEach((element) => {
      portfilioContainer.insertAdjacentElement("beforeend", element);
    });
  } else {
    portfolioItems.forEach((element) => {
      decendentLocations = [
        ...new Set(
          Array.from(element.querySelectorAll(".portfolio-item-cats span"))
            .filter(
              (e) =>
                e.textContent !== " · " &&
                e.textContent.includes(",") &&
                !e.textContent.includes("Featured")
            )
            .map((e) => e.textContent)
        ),
      ];
      if (decendentLocations.includes(e.target.value)) {
        portfilioContainer.insertAdjacentElement("beforeend", element);
      }
    });
  }

  window.dispatchEvent(new Event("resize"));
}

function handleIndustrySelect(e) {
  portfolioItems.forEach((e) => {
    e.remove();
  });

  if (e.target.value === "") {
    portfolioItems.forEach((element) => {
      portfilioContainer.insertAdjacentElement("beforeend", element);
    });
  } else {
    portfolioItems.forEach((element) => {
      decendentIndustries = [
        ...new Set(
          Array.from(element.querySelectorAll(".portfolio-item-cats span"))
            .filter(
              (e) =>
                e.textContent !== " · " &&
                !e.textContent.includes(",") &&
                !e.textContent.includes("Featured")
            )
            .map((e) => e.textContent)
        ),
      ];
      if (decendentIndustries.includes(e.target.value)) {
        portfilioContainer.insertAdjacentElement("beforeend", element);
      }
    });
  }

  window.dispatchEvent(new Event("resize"));
}

function handleSearchInput(e) {
  const lowercaseSearch = e.target.value.trim().toLowerCase();
  portfolioItems.forEach((e) => {
    e.remove();
  });

  if (e.target.value === "" || e.target.value.lenth < 3) {
    portfolioItems.forEach((element) => {
      portfilioContainer.insertAdjacentElement("beforeend", element);
    });
  } else {
    portfolioItems.forEach((element) => {
      titles = [
        ...new Set(
          Array.from(element.querySelectorAll(".thumb-title-inner-wrap")).map(
            (e) => e.textContent.trim().toLowerCase()
          )
        ),
      ];
      decendentIndustries = [
        ...new Set(
          Array.from(element.querySelectorAll(".portfolio-item-cats span"))
            .filter(
              (e) =>
                e.textContent !== " · " &&
                !e.textContent.includes(",") &&
                !e.textContent.includes("Featured")
            )
            .map((e) => e.textContent.trim().toLocaleLowerCase())
        ),
      ];
      decendentLocations = [
        ...new Set(
          Array.from(element.querySelectorAll(".portfolio-item-cats span"))
            .filter(
              (e) =>
                e.textContent !== " · " &&
                e.textContent.includes(",") &&
                !e.textContent.includes("Featured")
            )
            .map((e) => e.textContent.trim().toLocaleLowerCase())
        ),
      ];

      titles.forEach((title) => {
        if (title.includes(lowercaseSearch)) {
          portfilioContainer.insertAdjacentElement("beforeend", element);
        }
      });

      decendentIndustries.forEach((industry) => {
        if (industry.includes(lowercaseSearch)) {
          portfilioContainer.insertAdjacentElement("beforeend", element);
        }
      });

      decendentLocations.forEach((location) => {
        if (location.includes(lowercaseSearch)) {
          portfilioContainer.insertAdjacentElement("beforeend", element);
        }
      });
    });
  }

  window.dispatchEvent(new Event("resize"));
}

locationSelect.addEventListener("change", handleLocationSelect);
industrySelect.addEventListener("change", handleIndustrySelect);
nameSearch.addEventListener("keyup", handleSearchInput);
