let productdiv=document.querySelector(".products-div");
let loading=document.querySelector(".loading");
let spinnerContainer = document.querySelector('.spinner-container');
let searchinp=document.querySelector("#searchbtn");
let sortbtn=document.querySelector(".sort-btn");
let rangebtn=document.querySelector(".range-btn");
let volumeinput=document.querySelector("#volume");
let cowbellinput=document.querySelector("#cowbell");
let volumeval=document.querySelector(".volumeval");
let cowbellval=document.querySelector(".cowbellval");
fetch("https://fakestoreapi.com/products")
.then((response)=>{
    return {
        result: response.json(),
        statusCode: response.status
    }
})
.then((data)=>{
    if (data.statusCode>=200 && data.statusCode<300) {
        data.result.then((data)=>{
            spinnerContainer.style.display = "none";
            productdiv.style.display = "flex";
            data.forEach(product => {
                productdiv.innerHTML+=
                `
                 <div class="col-3 ml-5 mb-5">
                     <div class="card" style="width:18rem;">
                             <img class="card-img-top" src="${product.image}" alt="Card image cap">
                                <div class="card-body">
                                   <h5 class="card-title"><a href="details.html?id=${product.id}">${product.title}</a></h5>
                                   <p class="card-text">Price:${Math.round(product.price)}</p>
                                   <p class="card-text">Rate:${product.rating.rate}</p>
                                   <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                     </div>
                 </div>
                ` 
            });
        })
    }
    else{
        throw new Error("404 error not found!")
    }
});
searchinp.addEventListener("keyup",(e)=>{
    fetch("https://fakestoreapi.com/products")
    .then(res=>res.json())
    .then((data)=>{
        productdiv.innerHTML="";
        let searchtitleproduct=data.filter(item=>item.title.toLowerCase().trim().includes(e.target.value.toLowerCase().trim()));
        searchtitleproduct.forEach((item)=>{
            productdiv.innerHTML+=
                `
                 <div class="col-3 ml-5 mb-5">
                     <div class="card" style="width:18rem;">
                             <img class="card-img-top" src="${item.image}" alt="Card image cap">
                                <div class="card-body">
                                   <h5 class="card-title"><a href="details.html?id=${item.id}">${item.title}</a></h5>
                                   <p class="card-text">Price:${Math.round(item.price)}</p>
                                   <p class="card-text">Rate:${item.rating.rate}</p>
                                   <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                     </div>
                 </div>
                `
        });
    })
});
sortbtn.addEventListener("click",()=>{
    fetch("https://fakestoreapi.com/products")
    .then(res=>res.json())
    .then((data)=>{
        let sortedbyprice=data.sort((a,b)=>a.price-b.price);
        productdiv.innerHTML="";
        sortedbyprice.forEach((item)=>{
            productdiv.innerHTML+=
            `
                 <div class="col-3 ml-5 mb-5">
                     <div class="card" style="width:18rem;">
                             <img class="card-img-top" src="${item.image}" alt="Card image cap">
                                <div class="card-body">
                                   <h5 class="card-title"><a href="details.html?id=${item.id}">${item.title}</a></h5>
                                   <p class="card-text">Price:${Math.round(item.price)}</p>
                                   <p class="card-text">Rate:${item.rating.rate}</p>
                                   <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                     </div>
                 </div>
                 `
        })
    })
})
document.addEventListener("DOMContentLoaded",()=>{
    volumeinput.addEventListener("change",()=>{
        volumeval.textContent=volumeinput.value;
    })
    cowbellinput.addEventListener("change",()=>{
        cowbellval.textContent=cowbellinput.value;
    })
});
rangebtn.addEventListener("click",()=>{
    fetch("https://fakestoreapi.com/products")
    .then(res=>res.json())
    .then((data)=>{
        productdiv.innerHTML="";
        data.forEach((item)=>{
            productdiv.innerHTML+=
            `
            <div class="col-3 ml-5 mb-5">
                     <div class="card" style="width:18rem;">
                             <img class="card-img-top" src="${item.image}" alt="Card image cap">
                                <div class="card-body">
                                   <h5 class="card-title"><a href="details.html?id=${item.id}">${item.title}</a></h5>
                                   <p class="card-text">Price:${Math.round(item.price)}</p>
                                   <p class="card-text">Rate:${item.rating.rate}</p>
                                   <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                     </div>
                 </div>
            `
        })
        let prices=data.map(item=>item.price)
        volumeval.value=Math.min(...prices);
        cowbellval.value=Math.max(...prices);
    });
    fetch("https://fakestoreapi.com/products")
    .then(res=>res.json())
    .then((data)=>{
        productdiv.innerHTML="";
        let filterpricedatarange=data.filter(item=>item.price>=volumeinput.value && item.price<=cowbellinput.value );
        filterpricedatarange.forEach((item)=>{
            productdiv.innerHTML+=
            `
                 <div class="col-3 ml-5 mb-5">
                     <div class="card" style="width:18rem;">
                             <img class="card-img-top" src="${item.image}" alt="Card image cap">
                                <div class="card-body">
                                   <h5 class="card-title"><a href="details.html?id=${item.id}">${item.title}</a></h5>
                                   <p class="card-text">Price:${Math.round(item.price)}</p>
                                   <p class="card-text">Rate:${item.rating.rate}</p>
                                   <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                     </div>
                 </div>
                 `
        })
    })
})