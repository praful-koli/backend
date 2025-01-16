

// Select the button element with the ID 'btn'
let btn = document.querySelector("#btn");


// Add a click event listener to the button
btn.addEventListener("click", async () => {
  // Select the element with the ID 'display' where the joke will be shown
  let displayText = document.querySelector("#display");

  try {
    // Set the display text to "Loading..." while fetching the joke
    displayText.textContent = "Loading .....";

    // Fetch a joke from the JokeAPI
    let response = await fetch("https://v2.jokeapi.dev/joke/Any?safe-mode");
    console.log("this is respones : ",response);

    // Parse the JSON response from the API
    let data = await response.json();
 
    // Log the fetched data to the console for debugging
    console.log("this is data ",data);

    // Check the type of the joke
    if (data.type === "single") {
      // If the joke is of type 'single', display it directly
      displayText.textContent = data.joke;
    } else if (data.type === "twopart") {
      // If the joke is of type 'twopart', display the setup and delivery
      displayText.textContent = `${data.setup} - ${data.delivery}`;
    }
  } catch (error) {
    // If there is an error during the fetch, display an error message
    displayText.textContent = "Failed to fetch a joke. Please try again!";

    // Log the error to the console for debugging
    console.log(error);
  }
});




