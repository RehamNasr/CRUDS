let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let small = document.getElementById("small");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mode = "CREATE";
let index;
// get_total
// create product
// save local storage
// clear inputs
// read
// count
// delete
// update
// search
// clean data
function get_price() {
  if (price.value != "") {
    let TOTAL =
      price.value * 1 + taxes.value * 1 + ads.value * 1 - discount.value * 1;
    small.innerHTML = TOTAL;
    small.style.backgroundColor = "#040";
  } else {
    small.innerHTML = "";
    small.style.backgroundColor = "brown";
  }
}

// create product
let datapro;

if (localStorage.getItem("product") != null) {
  datapro = JSON.parse(localStorage.getItem("product"));
} else {
  datapro = [];
}

submit.onclick = function () {
  let obj = {
    title: title.value,
    price: price.value * 1,
    taxes: taxes.value * 1,
    ads: ads.value * 1,
    discount: discount.value * 1,
    total: small.innerHTML,
    count: count.value * 1,
    category: category.value,
  };
  if (!(obj.title == "" || obj.price == 0 || obj.total == 0 || obj.category =='')) {
    if (mode === "CREATE") {
      if (count.value * 1 <= 1) {
        datapro.push(obj);
      } else {
        for (let i = 0; i < count.value * 1; i++) {
          datapro.push(obj);
        }
      }
    } else {
      datapro[index] = obj;
      count.style.display = "block";
      submit.innerHTML = "CREATE";
      mode = "CREATE";
    }
  
    localStorage.setItem("product", JSON.stringify(datapro));
    showData();
    showbuttondelete();
    clear();
    get_price();
}else{
    alert("يحب ادخال حميع البيانات")
  }

  //localstorage
  
};

// clear inputs
function clear() {
  title.value = "";
  price.value = "";
  (taxes.value = ""),
    (ads.value = ""),
    (discount.value = ""),
    (small.innerHTML = ""),
    (count.value = ""),
    (category.value = "");
}

//read
function showData() {
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `
        <tr>
                        <td>${i + 1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button id="update" onclick=update(${i})>update</button></td>
                        <td><button id="delete" onclick=deletedata(${i})>delete</button></td>
                    </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;
}
showData();

//delete
function deletedata(i) {
  datapro.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(datapro));
  showData();
  showbuttondelete();
  // console.log(i)
  alert("تم الحذف بنجاح")
}

let deleteallproduct = document.getElementById("deletealldiv");
function showbuttondelete() {
  if (datapro.length == 0) {
    deleteallproduct.style.display = "none";
  } else {
    deleteallproduct.style.display = "flex";
    document.getElementById("numproduct").innerHTML =
      " (" + datapro.length + ")";
  }
}
showbuttondelete();

function deleteall() {
  datapro.splice(0);
  localStorage.clear();
  showbuttondelete();
  showData();
  alert("تم الحذف بنجاح")
}

// update

function update(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  count.style.display = "none";
  category.value = datapro[i].category;
  get_price();
  mode = "update";
  submit.innerHTML = "update";
  index = i;
  scroll({
    top:0,
    behavior:"smooth"
  })
}


// search
let modesearch='title'

function searchtype(id){
  let search=document.getElementById('search')
  if(id=='stitle'){
    modesearch='title'
    search.placeholder='Search by title'

  }else{
    modesearch='category'
    search.placeholder='Search by category'


  }
  console.log(modesearch)
}
searchtype("stitle")

function srachdata(value){
  datapro=JSON.parse(localStorage.getItem("product"))
  let obj=[]
 if(modesearch=='title'){
  for (let i=0;i<datapro.length;i++){
    if(datapro[i].title.toLowerCase().includes(value)){
      obj.push(datapro[i])
    }
  }
 }else{
  for (let i=0;i<datapro.length;i++){
    if(datapro[i].category.toLowerCase().includes(value)){
      obj.push(datapro[i])
    }
  }
 }
   datapro=obj;
   showData()
   console.log(datapro)
   showbuttondelete()
}4