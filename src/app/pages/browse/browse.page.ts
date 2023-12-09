import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
})
export class BrowsePage implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log();
  }

  showResult(str) {
    const Http = new XMLHttpRequest();
    const url =
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + str;
    Http.open('GET', url);
    Http.send();

    Http.onreadystatechange = (e) => {
      if (Http.readyState == 4 && Http.status == 200) {
        const data = Http.responseText;

        var resObj = JSON.parse(data);

        var searchTopResult = resObj.drinks[0];
        var cocktailTitle = searchTopResult.strDrink;
        var cocktailImg = searchTopResult.strDrinkThumb;
        var cocktailIngredients = [] as any;

        for (let i = 1; i < 16; i++) {
          var singleIngredient = resObj.drinks[0][`strIngredient${i}`];
          if (singleIngredient === null) {
            break;
          } else {
            cocktailIngredients += singleIngredient + ' ';
          }
        }

        var findDiv = document.querySelector<HTMLElement>('.cocktail-card');
        findDiv.style.display = "block";
        findDiv.innerHTML = `
      <span class="cocktail-title">${cocktailTitle}</span>
      <p><img src="${cocktailImg}" class="cocktail-img"></p>
      <p>${cocktailIngredients}</p>`;
      }
    };
  }
}
