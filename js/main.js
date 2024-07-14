let rowData = document.querySelector(".row");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;


// open and close navbar
$(".openNav").click(function () {
    $("#leftMenu").animate({ width:'250px'},50)
   $(".text").animate({marginLeft :'250px'},50)
})

$(".closebtn").click(function(){
    $("#leftMenu").animate({ width:'0px'},50)
   $(".text").animate({marginLeft :'0px'},50)
})


// default display
async function getMealData() {
    let mealResponse = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    mealData = await mealResponse.json();
    return mealData.meals;
}


function displayMeals(data) {
    let box = "";

    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2">
                    <img class="w-100" src="${data[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${data[i].strMeal}</h3>
                    </div>
                </div>
        </div>`
    }

    rowData.innerHTML = box
}

async function startApp() {
    let mealData = await getMealData();
    displayMeals(mealData)
}
startApp() 



// get catgerious
async function getCategories() {
    rowData.innerHTML = ""
    searchContainer.innerHTML = ""

    let respone = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    respone = await respone.json()
    displayCategories(respone.categories)

    $("#leftMenu").animate({ width:'0px'},50)
    $(".text").animate({ marginLeft: '0px' }, 50)
    document.getElementById("logo").style.marginTop = "2px";
}

function displayCategories(data) {
    let box = "";
    for (i = 0; i < data.length; i++){
        box += `
                <div class="col-md-3">
                <div onclick="getMealByCategory('${data[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${data[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${data[i].strCategory}</h3>
                        <p>${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = box
}


async function getMealByCategory(category) {
    rowData.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    respone = await respone.json()

    displayMeals(respone.meals.slice(0, 20))
}


// get areas
async function getArea() {
    rowData.innerHTML = ""
    searchContainer.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()

    displayArea(response.meals)
    $("#leftMenu").animate({ width:'0px'},50)
    $(".text").animate({ marginLeft: '0px' }, 50)
    document.getElementById("logo").style.marginTop = "2px";
}


function displayArea(data) {
    rowData.innerHTML = ""

    let box = ""

    for (i = 0; i < data.length; i++){
        box += `
                <div class="col-md-3">
                <div onclick="getMealByArea('${data[i].strArea}')" class="rounded-2 text-center area">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h4>${data[i].strArea}</h4>
                </div>
        </div>
        `
    }

    rowData.innerHTML = box
}

async function getMealByArea(area) {
    rowData.innerHTML = ""
    searchContainer.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()

    displayMeals(response.meals.slice(0, 20))
}


//get Ingredients
async function getIngredients() {
    rowData.innerHTML = ""
    searchContainer.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json()

    displayIngredients(response.meals.slice(0, 20))
    $("#leftMenu").animate({ width:'0px'},50)
    $(".text").animate({ marginLeft: '0px' }, 50)
    document.getElementById("logo").style.marginTop = "2px";
}

function displayIngredients(data) {
    let box = ""
    
    for (i = 0; i < data.length; i++){
        box += `
                <div class="col-md-3">
                <div onclick="displayMealByIngredients('${data[i].strIngredient}')" class="rounded-2 text-center Ingredients">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h4>${data[i].strIngredient}</h4>
                        <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = box
}

async function displayMealByIngredients(ing) {
    rowData.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
    response = await response.json()

    displayMeals(response.meals.slice(0, 20))
}


// get meal details
async function getMealDetails(mealID) {
    rowData.innerHTML = ""
    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
}

function displayMealDetails(meal) {
    
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    let box = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = box
}


//search
function showSearchInputs(){
    searchContainer.innerHTML = `
        <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>
    `
    rowData.innerHTML = "";
    $("#leftMenu").animate({ width:'0px'},50)
    $(".text").animate({marginLeft :'0px'},50)
    document.getElementById("icns").style.paddingBottom = "23px";
    document.getElementById("logo").style.marginTop = "-25px";
}


async function searchByName(nameValue) {
    rowData.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameValue}`)
    response = await response.json()
    if (response.meals) {
        displayMeals(response.meals)
    }
    else {
        displayMeals([])
    }
}

async function searchByFLetter(letterValue) {
    rowData.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letterValue}`)
    response = await response.json()
    if (response.meals) {
        displayMeals(response.meals)
    }
    else {
        displayMeals([])
    }
}


//contact
function showContacts() {
    searchContainer.innerHTML = ""
    rowData.innerHTML = `
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div>
    `

    $("#leftMenu").animate({ width:'0px'},50)
    $(".text").animate({ marginLeft: '0px' }, 50)
    document.getElementById("logo").style.marginTop = "2px";
    

    submitBtn = document.getElementById("submitBtn");

    document.getElementById("nameInput").addEventListener("focus", () => {
        nameSelected = true
    })

    document.getElementById("emailInput").addEventListener("focus", function () {
        emailSelected = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneSelected = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageSelected = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordSelected = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordSelected = true
    })
}

nameSelected = false;
emailSelected = false;
phoneSelected = false;
ageSelected = false;
passwordSelected = false;
repasswordSelected = false;


function inputsValidation() {
    if (nameSelected) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailSelected) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneSelected) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageSelected) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordSelected) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordSelected) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}





