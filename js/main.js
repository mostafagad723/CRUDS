let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let creat = document.getElementById("creat");
let search = document.getElementById("search");
let searchByTitle = document.getElementById("btn1");
let searchByCategory = document.getElementById("btn2");
let tBody = document.getElementById("tBody");
let inputs = document.querySelectorAll("#title,#price,#taxes,#ads,#discount");
let updateBtn=document.getElementById("updateBtn")
let deleteBtn = document.getElementById("deleteBtn");
let deleteAll = document.getElementById("deleteAll");

let dataArray = [];

function getTotal() {
    let result = 0;
    inputs.forEach((ele) => {
        ele.addEventListener("keyup", (_) => {
            if (title.value != '' && price != '') {
                result = (+price.value + +taxes.value + +ads.value) - + discount.value;
                total.innerHTML = result;
                total.classList.add("total-full");
            } else {
                total.classList.remove("total-full");
                total.innerHTML = '';
            }
        })
    });
}

function clearInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    search.value = '';
}

function creatElement() {
    let element = {
        theTitle: title.value,
        thePrice: price.value,
        theTaxes: taxes.value,
        theAds: ads.value,
        theDiscount: discount.value,
        theCount: count.value,
        theCategory:category.value,
    }
    if (element.theTitle != '' && element.thePrice != '' && element.theCount > 1) {
        for (let i = 0; i < element.theCount; i++) {
            dataArray.push(element);
        }
    }else if (element.theTitle != '' && element.thePrice != '') {
        dataArray.push(element);
    }
    localStorage.setItem("Elements", JSON.stringify(dataArray));
}

function dataStorag() {
    if (localStorage.getItem("Elements") != null) {
        dataArray = JSON.parse(localStorage.getItem("Elements"));
    } else {
        dataArray = [];
    }
}

dataStorag();

function printElement() {
    let items = '';
    dataArray.forEach(function (element , index) {
        items += `
            <tr>
                <td>${index+1}</td>
                <td>${element.theTitle}</td>
                <td>${element.thePrice}</td>
                <td>${element.theTaxes}</td>  
                <td>${element.theAds}</td>
                <td>${element.theDiscount}</td>
                <td>${element.theCount}</td>
                <td>${element.theCategory}</td>
                <td><button onclick="updateElement(${element})" id="updateBtn">Updat</button></td>
                <td><button onclick="deleteElement(${index})" id="deleteBtn">Delete</button></td>
            </tr>
        
        `;
    });
    tBody.innerHTML = items;
    
    
    if (dataArray.length > 0) {
            deleteAll.innerHTML = `<button onclick="clearAll()" id="delAll">Delete All ${dataArray.length} Products</button>`;
        } else {
            deleteAll.innerHTML = '';
        }
}

// function updateElement(element) {
//     title.value = element.theTitle;
//     price.value = element.thePrice;
//     taxes.value = element.theTaxes;
//     ads.value = element.theAds;
//     discount.value = element.theDiscount;
//     count.value = element.theCount;
//     category.value = element.theCategory;
    
// }



function deleteElement(index) {
    if (confirm(`Dnger !!!! \nAre You Sure ?\n Delete This Item  =>(${dataArray[index].theTitle}) ?`)) {
        dataArray.splice(index, 1);
        localStorage.Elements = JSON.stringify(dataArray);
        printElement();
    } else {
        console.log("No Actions");
    }
    
}

function clearAll() {
    if (confirm(`Dnger !!!! \nAre You Sure ?\n Delete All Products => (${dataArray.length}) ?`)) {
        localStorage.clear();
        dataArray.splice(0);
        printElement();
    } else {
        console.log("No Actions");
    }
}


clearInputs();
getTotal();
clearInputs();
printElement();
clearInputs();

creat.onclick = _ => {
    creatElement();
}