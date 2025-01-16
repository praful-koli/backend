const url = "https://cat-fact.herokuapp.com/facts";

let factpara = document.querySelector(".fact");
let btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  getFact();
});



async function getFact() {
  try {
    const Response = await fetch(url);
    if (!Response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await Response.json();
    let factNo = Math.floor(Math.random() * 7);
    console.log(data[factNo].text);
    factpara.innerText = data[factNo].text;
  } catch (error) {
    console.log(error.message);
  }
}
