const recipeContainer = document.querySelector('.recipe');
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io
///////////////////////////////////////
const showRecipe = async function() {
    try {
        // 1) Loading recipe
        const res = await fetch('https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886');
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        let { recipe } = data.data;
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };
        console.log(recipe);
        // 2) Rendering recipe
        const markup = `
      <figure class="recipe__fig">
        <img src="${recipe.image}"alt="${recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="src/img/iconssvg#icon-clock"></use>
          </svg>
          <span class="recipe__info-datarecipe__info-data--minutes">${recipe.cookingTime}<span>
          <spanclass="recipe__info-text">minutes<span>
        </div>

        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="src/img/iconssvg#icon-users"></use>
          </svg>
          <span class="recipe__info-datarecipe__info-data--people">${recipe.servings}</span>
          <spanclass="recipe__info-text">servings</span>
          <div class="recipe__info-buttons">
            <button class="btn--tinybtn--increase-servings">
              <svg>
                <use href="src/img/iconssvg#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tinybtn--increase-servings">
              <svg>
                <use href="src/img/iconssvg#icon-plus-circle"></use>
              </svg>
            </button>
          </div>

        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="src/img/iconssvg#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="src/img/iconssvg#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipeingredients</h2>
        <ul class="recipe__ingredient-list">
          ${recipe.ingredients.map((ing)=>{
            return `
              <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="src/img/iconssvg#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ing.quantity}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ing.unit}</span>
                  ${ing.description}
                </div>
              </li>
            `;
        }).join('')}
        </ul>
      </div>
      <div class="recipe__directions">
        <h2 class="heading--2">How to cookit</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designedand tested by
          <spanclass="recipe__publisher">${recipe.publisher}</span>. Please checkout
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="src/img/iconssvg#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
        recipeContainer.innerHTML = '';
        recipeContainer.insertAdjacentHTML('afterbegin', markup);
    } catch (err) {
        console.error(err);
    }
};
showRecipe();

//# sourceMappingURL=index.62406edb.js.map
