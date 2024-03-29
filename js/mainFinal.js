


/*------------------------------------Variables--------------------------------------*/
let closeBtn = document.getElementById('closeNav');
let categoryBtn = document.getElementById('Categories');
let areaBtn = document.getElementById('Area');
let ingredientsBtn = document.getElementById('ingredient');
let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let phoneInput = document.getElementById("phoneInput");
let ageInput = document.getElementById("ageInput");
let passwordInput = document.getElementById("passwordInput");
let repasswordInput = document.getElementById("repasswordInput");
let search = document.getElementById('searchContainer');
let contact = document.getElementById('rowData');
let submitBtn = document.getElementById('submitBtn');
let searchMealName = document.getElementById('MealByName');
let searchMealLetter = document.getElementById('MealByLetter');
let nameAlert = document.getElementById("nameAlert");
let emailAlert = document.getElementById("emailAlert");
let phoneAlert = document.getElementById("phoneAlert");
let ageAlert = document.getElementById("ageAlert");
let passwordAlert = document.getElementById("passwordAlert");
let repasswordAlert = document.getElementById("repasswordAlert");


/*------------------------------------SideNavBar && Events--------------------------------------*/
$(document).ready(() => {
    getSearchMealByName().then(() => {
        $(".loading-screen").fadeOut(500)
    })
});

closeBtn.addEventListener('click', function () {
    if ($("#nav").css("left") == "0px") {
        let navSize = $("#navMenu").outerWidth()
        $("#nav").animate({
            left: -navSize
        }, 500)

        $(".open-close-icon").addClass("fa-align-justify");
        $(".open-close-icon").removeClass("fa-x");


        $(".links li").animate({
            top: 300
        }, 700)
    }
    else {
        $("#nav").animate({
            left: 0
        }, 500)

        $("#closeNav").removeClass("fa-align-justify");
        $("#closeNav").addClass("fa-x");


        for (let i = 0; i < 5; i++) {
            $(".links li").eq(i).animate({
                top: 0
            }, i * 300)
        }
    }

});

categoryBtn.addEventListener('click', function () {
    document.getElementById('ReturnDataBySearchName').innerHTML = '';
    search.classList.remove('d-block');
    search.classList.add('d-none');
    contact.classList.remove('d-block');
    contact.classList.add('d-none');
    document.getElementById('dataingredient').classList.add('d-none');
    getCategory();
});

areaBtn.addEventListener('click', function () {
    search.classList.remove('d-block');
    search.classList.add('d-none');
    contact.classList.remove('d-block');
    contact.classList.add('d-none');
    document.getElementById('dataingredient').classList.add('d-none');


    getArea()
});

ingredientsBtn.addEventListener('click', function () {
    document.getElementById('ReturnDataBySearchName').innerHTML = '';
    search.classList.remove('d-block');
    search.classList.add('d-none');
    contact.classList.remove('d-block');
    contact.classList.add('d-none');
    document.getElementById('dataingredient').classList.add('d-none');
    getIngredients();
});

/*------------------------------------Api--------------------------------------*/

async function getSearchMealByName(mealName = '') {
    $(".inner-loading-screen").fadeIn(300);
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    let data = await request.json();
    displayMealByName(data.meals);
    $(".inner-loading-screen").fadeOut(300);

}


async function getSearchMealByLetter(mealLetter) {
    document.getElementById('ReturnDataBySearchName').innerHTML = '';
    document.getElementById('dataingredient').innerHTML = '';
    $(".loading-screen").fadeOut(500);
    (mealLetter == "") ? mealLetter = "a" : "";
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealLetter}`);
    let data = await request.json();
    data.meals ? displayMealByName(data.meals) : displayMealByName([]);
    $(".loading-screen").fadeOut(300);

}

async function getDetails(id) {
    document.getElementById('ReturnDataBySearchName').innerHTML = '';
    document.getElementById('dataingredient').innerHTML = '';
    $(".loading-screen").fadeIn(300);
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let data = await request.json();
    displayDetails(data.meals)
    $(".loading-screen").fadeOut(300);
}

async function getMealCategory(mealcategory) {
    document.getElementById('ReturnDataBySearchName').innerHTML = '';
    document.getElementById('dataingredient').innerHTML = '';
    $(".loading-screen").fadeIn(300);
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealcategory}`);
    let data = await request.json();
    displayMealCategory(data.meals);
    $(".loading-screen").fadeOut(300);
}

async function getCategory() {
    document.getElementById('ReturnDataBySearchName').innerHTML = '';
    document.getElementById('dataingredient').innerHTML = '';
    $(".loading-screen").fadeIn(300);
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let data = await request.json();
    displaycategory(data.categories);
    $(".loading-screen").fadeOut(300);

}

async function getArea() {
    document.getElementById('ReturnDataBySearchName').innerHTML = '';
    document.getElementById('dataingredient').innerHTML = '';
    $(".loading-screen").fadeIn(300);
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let data = await request.json();
    displayArea(data.meals);
    $(".loading-screen").fadeOut(300);

}

async function getMealArea(mealarea) {
    document.getElementById('ReturnDataBySearchName').innerHTML = '';
    document.getElementById('dataingredient').innerHTML = '';
    $(".loading-screen").fadeIn(300);
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealarea}`);
    let data = await request.json();
    displayMealArea(data.meals);
    $(".loading-screen").fadeOut(300);
}

async function getIngredients() {
    document.getElementById('ReturnDataBySearchName').innerHTML = '';
    document.getElementById('dataingredient').innerHTML = '';
    $(".loading-screen").fadeIn(300);
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let data = await request.json();
    displayIngredients(data.meals.slice(0, 20));
    $(".loading-screen").fadeOut(300);

}

async function getMealIngredient(mealingredient) {
    document.getElementById('ReturnDataBySearchName').innerHTML = '';
    document.getElementById('dataingredient').innerHTML = '';
    $(".loading-screen").fadeIn(300);
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealingredient}`);
    let data = await request.json();
    displayMealIngredient(data.meals);
    $(".loading-screen").fadeOut(300);

}
/*------------------------------------Display--------------------------------------*/

function displayMealByName(Meal) {
    let temp = '';
    Meal.forEach(e => {
        temp += `   <div class="col-md-3 "  >
                         <div class="position-relative maindiv mealmain  overflow-hidden rounded" meal-id=${e.idMeal}>
                                 <img src="${(e.strMealThumb == null) ? 'images/banner.png' : e.strMealThumb}" class="w-100" meal-id=${e.idMeal}  alt="">
                            <div class="layer details position-absolute d-flex align-items-center" meal-id=${e.idMeal} >
                                  <h5 meal-id=${e.idMeal} class="text-black fs-3" >${e.strMeal}</h5>
                            </div>
                        </div>
                    </div>`;
    });

    document.getElementById('ReturnDataBySearchName').innerHTML = temp;

    document.querySelectorAll('.details').forEach(element => {
        element.addEventListener('click', function (e) {
            let id = e.target.getAttribute('meal-id');
            getDetails(id)
        });
    });
}

function displaysearchInput() {
    search.classList.remove('d-none');
    search.classList.add('d-block');
    contact.classList.remove('d-block');
    contact.classList.add('d-none');
    document.getElementById('dataingredient').classList.add('d-none');


    document.getElementById('ReturnDataBySearchName').innerHTML = '';


    searchMealName.addEventListener('keyup', function () {
        getSearchMealByName(searchMealName.value);

    });
    searchMealLetter.addEventListener('keyup', function () {


        getSearchMealByLetter(searchMealLetter.value);


    });
}

function displayDetails(dataid) {
    document.getElementById('ReturnDataBySearchName').innerHTML = '';
    document.getElementById('dataingredient').classList.remove('d-none')
    search.classList.remove('d-block');
    search.classList.add('d-none');
    contact.classList.remove('d-block');
    contact.classList.add('d-none');




    let temp = "";
    dataid.forEach(e => {
        temp += `<div class="col-md-4" >
        <img src="${e.strMealThumb}" class="w-100 rounded" alt="">
        <h2 class="mt-1">${e.strMeal}</h2>
       </div >
       <div class="col-md-8">
        <h2>instrection</h2>
        <p>${e.strInstructions}</p>

        <h3>Area : <span class="fs-4">${e.strArea}</span></h3>
        <h3> Category : <span class="fs-4">${e.strCategory}</span></h3>
        <h3>Recipes : <span class=" fs-4"></span></h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">`;

        for (let i = 1; i <= 20; i++) {
            const ingredient = e[`strIngredient${i}`];
            const measure = e[`strMeasure${i}`];
            if (ingredient && measure) {
                temp += `<li class="alert alert-info m-2 p-1" > ${measure} ${ingredient}</li > `;
            }
        }


        temp += `
        </ul >
        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">

            <li class="alert alert-danger m-2 p-1">${(e.strTags == null) ? '' : e.strTags}</li>
        </ul>
        <a target="_blank" href="${e.strSource}"
            class="btn btn-success">Source</a>
        <a target="_blank" href="${e.strYoutube}" class="btn btn-danger">Youtube</a>
       </div > ` ;
    });
    document.getElementById('dataingredient').innerHTML = temp;

}

function displayMealCategory(Meal) {
    let temp = '';
    Meal.forEach(e => {
        temp += `   <div class="col-md-3 "  >
                         <div class="position-relative maindiv mealmain  overflow-hidden rounded" meal-id=${e.idMeal}>
                                 <img src="${(e.strMealThumb == null) ? 'images/banner.png' : e.strMealThumb}" class="w-100" meal-id=${e.idMeal}  alt="">
                            <div class="layer details position-absolute d-flex align-items-center" meal-id=${e.idMeal} >
                                  <h5 meal-id=${e.idMeal} class="text-black fs-3" >${e.strMeal}</h5>
                            </div>
                        </div>
                    </div>`;
    });

    document.getElementById('ReturnDataBySearchName').innerHTML = temp;

    document.querySelectorAll('.details').forEach(element => {
        element.addEventListener('click', function (e) {
            let id = e.target.getAttribute('meal-id');
            getDetails(id)
        });
    });



}

function displaycategory(Meal) {
    let temp = '';
    Meal.forEach(e => {
        temp += `   <div class="col-md-3">
        <div  categorymeal=${e.strCategory} class="position-relative maindiv category overflow-hidden rounded">
            <img src="${(e.strCategoryThumb == null) ? 'images/banner.png' : e.strCategoryThumb}" class="w-100" categorymeal=${e.strCategory} alt="">
            <div class="layer position-absolute pt-2 d-flex flex-column text-black text-center" categorymeal=${e.strCategory}>
                <h5 categorymeal=${e.strCategory} class=" fs-3">${e.strCategory}</h5>
                <p  categorymeal=${e.strCategory}>${(e.strCategoryDescription == null) ? 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus animi eveniet deserunt eaque tenetur, voluptatibus neque vel debitis eos explicabo!' : e.strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
        </div>
    </div>`;

    });

    document.getElementById('ReturnDataBySearchName').innerHTML = temp;


    document.querySelectorAll('.category').forEach(element => {
        element.addEventListener('click', function (e) {
            let categorymeal = e.target.getAttribute('categorymeal');
            getMealCategory(categorymeal)
        });
    });
}

function displayArea(Meal) {
    let temp = '';
    Meal.forEach(e => {
        temp += ` <div class="col-md-3 ">
        <div areameal=${e.strArea} class= " area  d-flex flex-column justify-content-center align-items-center" >
        <i areameal=${e.strArea} class="fa-solid fa-house-laptop fa-4x"></i>
        <h5 areameal=${e.strArea} class="text-white fs-3">${e.strArea}</h5>
        </div >
    </div > `;

    });

    document.getElementById('ReturnDataBySearchName').innerHTML = temp;

    document.querySelectorAll('.area').forEach(element => {
        element.addEventListener('click', function (e) {
            let areameal = e.target.getAttribute('areameal');
            getMealArea(areameal)
        });
    });
}

function displayMealArea(Meal) {
    let temp = '';
    Meal.forEach(e => {
        temp += `   <div class="col-md-3 "  >
                         <div class="position-relative maindiv mealmain  overflow-hidden rounded" meal-id=${e.idMeal}>
                                 <img src="${(e.strMealThumb == null) ? 'images/banner.png' : e.strMealThumb}" class="w-100" meal-id=${e.idMeal}  alt="">
                            <div class="layer details position-absolute d-flex align-items-center" meal-id=${e.idMeal} >
                                  <h5 meal-id=${e.idMeal} class="text-black fs-3" >${e.strMeal}</h5>
                            </div>
                        </div>
                    </div>`;
    });

    document.getElementById('ReturnDataBySearchName').innerHTML = temp;

    document.querySelectorAll('.details').forEach(element => {
        element.addEventListener('click', function (e) {
            let id = e.target.getAttribute('meal-id');
            getDetails(id)
        });
    });



}

function displayIngredients(Meal) {
    let temp = '';
    Meal.forEach(e => {
        temp += ` <div class="col-md-3">
        <div ingredientmeal=${e.strIngredient} class=" ingredient d-flex flex-column text-white justify-content-center align-items-center">
        <i ingredientmeal=${e.strIngredient} class="fa-solid fa-drumstick-bite fa-4x"></i>
       <h4 ingredientmeal=${e.strIngredient} class=" fs-3">${e.strIngredient}</h4>
       <p ingredientmeal=${e.strIngredient} class="text-center">${(e.strDescription == null) ? 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus animi eveniet deserunt eaque tenetur, voluptatibus neque vel debitis eos explicabo!' : e.strDescription.split(" ").slice(0, 20).join(" ")}

       </p>
        </div>
    </div>`;


    });

    document.getElementById('ReturnDataBySearchName').innerHTML = temp;



    document.querySelectorAll('.ingredient').forEach(element => {
        element.addEventListener('click', function (e) {
            let ingredientmeal = e.target.getAttribute('ingredientmeal');
            getMealIngredient(ingredientmeal)
        });
    });


}

function displayMealIngredient(Meal) {
    let temp = '';
    Meal.forEach(e => {
        temp += `   <div class="col-md-3 "  >
                         <div class="position-relative maindiv mealmain  overflow-hidden rounded" meal-id=${e.idMeal}>
                                 <img src="${(e.strMealThumb == null) ? 'images/banner.png' : e.strMealThumb}" class="w-100" meal-id=${e.idMeal}  alt="">
                            <div class="layer details position-absolute d-flex align-items-center" meal-id=${e.idMeal} >
                                  <h5 meal-id=${e.idMeal} class="text-black fs-3" >${e.strMeal}</h5>
                            </div>
                        </div>
                    </div>`;
    });

    document.getElementById('ReturnDataBySearchName').innerHTML = temp;

    document.querySelectorAll('.details').forEach(element => {
        element.addEventListener('click', function (e) {
            let id = e.target.getAttribute('meal-id');
            getDetails(id)
        });
    });



}

function displayContact() {
    document.getElementById('ReturnDataBySearchName').innerHTML = '';
    document.getElementById('dataingredient').innerHTML = '';
    search.classList.remove('d-block');
    search.classList.add('d-none');
    contact.classList.add('d-block');
    contact.classList.remove('d-none');
    document.getElementById('dataingredient').classList.add('d-none');


}

/*------------------------------------Functions--------------------------------------*/



function inputsValidation() {
    if (validationNameInput() == true &&
        validationEmailInput() == true &&
        validationPhoneInput() == true &&
        validationAgeInput() == true &&
        validationPasswordInput() == true &&
        validationRepasswordInput() == true) {

        submitBtn.removeAttribute("disabled")
    }
    else {
        submitBtn.setAttribute("disabled", true)
    }
}

function validationNameInput() {
    if ((/^[a-zA-Z ]+$/.test(nameInput.value)) == true) {
        nameAlert.classList.remove("d-block");
        nameAlert.classList.add("d-none");
        nameInput.classList.remove('is-invalid');
        nameInput.classList.add('is-valid');

        return true;
    }
    else {
        nameInput.classList.add('is-valid');
        nameInput.classList.remove('is-invalid');
        nameAlert.classList.remove("d-block");
        nameAlert.classList.add("d-none");

        return false;

    }
}

function validationEmailInput() {
    if ((/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput.value)) == true) {
        emailAlert.classList.remove("d-block");
        emailAlert.classList.add("d-none");
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
        return true;
    }
    else {
        emailAlert.classList.add("d-block");
        emailAlert.classList.remove("d-none");
        emailInput.classList.remove('is-valid');
        emailInput.classList.add('is-invalid');

        return false;

    }
}

function validationPhoneInput() {
    if ((/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phoneInput.value)) == true) {
        phoneAlert.classList.remove("d-block");
        phoneAlert.classList.add("d-none");
        phoneInput.classList.remove('is-invalid');
        phoneInput.classList.add('is-valid');

        return true;
    }
    else {
        phoneAlert.classList.add("d-block");
        phoneAlert.classList.remove("d-none");
        phoneInput.classList.remove('is-valid');
        phoneInput.classList.add('is-invalid');

        return false;

    }
}

function validationAgeInput() {
    if ((/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(ageInput.value))) {
        ageAlert.classList.remove("d-block");
        ageAlert.classList.add("d-none");
        ageInput.classList.remove('is-invalid');
        ageInput.classList.add('is-valid');
        return true;
    }
    else {
        ageAlert.classList.add("d-block");
        ageAlert.classList.remove("d-none");
        ageInput.classList.remove('is-valid');
        ageInput.classList.add('is-invalid');

        return false;

    }
}

function validationPasswordInput() {
    if ((/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(passwordInput.value)) == true) {
        passwordAlert.classList.remove("d-block");
        passwordAlert.classList.add("d-none");
        passwordInput.classList.remove('is-invalid');
        passwordInput.classList.add('is-valid');
        return true;
    }
    else {
        passwordAlert.classList.add("d-block");
        passwordAlert.classList.remove("d-none");
        passwordInput.classList.remove('is-valid');
        passwordInput.classList.add('is-invalid');

        return false;

    }
}

function validationRepasswordInput() {

    if (repasswordInput.value == passwordInput.value) {
        repasswordAlert.classList.remove("d-block");
        repasswordAlert.classList.add("d-none");

        return true
    }
    else {
        repasswordAlert.classList.add("d-block");
        repasswordAlert.classList.remove("d-none");
        return false;

    }
}

