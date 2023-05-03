let infodiv=document.querySelector(".info-div");
let url="https://fakestoreapi.com/products";
let id=document.location.search.slice(4);
let loadingdetail=document.querySelector(".loading-detail");
let spinnerContainer2 = document.querySelector('.spinner-container');
let gobackbtn=document.querySelector(".go-back-btn");
fetch(`https://fakestoreapi.com/products/${id}`)
.then((response)=>{
    return {
        result: response.json(),
        statusCode: response.status
    }
})
.then((data)=>{
    if (data.statusCode>=200 && data.statusCode<300) {
        data.result.then((item)=>{
            spinnerContainer2.style.display = "none";
            infodiv.style.display="flex";
            infodiv.innerHTML+=
            `
            <div class="col-6">
               <img src="${item.image}" alt="img">
            </div>
            <div class="col-6">
            <h2>${item.title}</h2>
            <p>Id:${item.id}</p>
            <p>Price: ${Math.round(item.price)}</p>
            <p>Category: ${item.category.toUpperCase()}</p>
            <p>Description: ${item.description}</p>
            <p>Rating: ${item.rating.rate}</p>
            <p>Count: ${item.rating.count}</p>
            </div>
            `
        })
    }
    else{
        throw new Error("404 error not found!")
    }
});
gobackbtn.addEventListener("click",()=>{
    window.history.back();
})