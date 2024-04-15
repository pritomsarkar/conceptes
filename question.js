// callback hell

function fetchData(url, callback) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log("I am First Url data using callback");
      fetch(data.url)
        .then((res) => res.json())
        .then((data) => {
          console.log("I am second Url data using callback");
          fetch(data.url)
            .then((res) => res.json())
            .then((data) => {
              console.log("I am Final Url data using callback");
              callback(null, data);
            })
            .catch((err) => callback(err));
        })
        .catch((err) => callback(err));
    })
    .catch((err) => callback(err));
}

fetchData("http://localhost:3000/url1", (err, result) => {
  if (err) {
    console.error("Error fetching data using callback", err);
  } else {
    console.log("Received final data using callback:", result);
  }
});

/* output - 
I am First Url data
I am second Url data
I am Final Url data
Received final data: { data: 'It is an actual data' }
*/

// promise-chain

function fetchFirstData(url) {
  let fetchDataFirstUrlPromise = new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("I am First Url data using Promise");
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return fetchDataFirstUrlPromise;
}

function fetchSecondData(url) {
  let fetchDataSecondUrlPromise = new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("I am Second Url data using Promise");
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return fetchDataSecondUrlPromise;
}

function fetchFinalData(url) {
  let fetchDataFinalUrlPromise = new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("I am Final Url data using Promise");
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return fetchDataFinalUrlPromise;
}

let InitialUrl = "http://localhost:3000/url1";
fetchFirstData(InitialUrl)
  .then((data) => data.url)
  .then((url) => fetchSecondData(url))
  .then((data) => data.url)
  .then((url) => fetchFinalData(url))
  .then((data) => {
    console.log("Received final data using Promise:", data);
  })
  .catch((error) => {
    console.error("Error fetching data using Promise", error);
  });

// async-await

async function getData(url) {
  try {
    let firstResponse = await fetch(url);
    let firstData = await firstResponse.json();
    console.log("I am first data from async-await : ", firstData.url);
    let secondResponse = await fetch(firstData.url);
    let secondData = await secondResponse.json();
    console.log("I am second data from async-await : ", secondData.url);
    let finalResponse = await fetch(secondData.url);
    let finalData = await finalResponse.json();
    console.log("I am Final data from async-await : ", finalData.data);
  } catch (error) {
    console.error(error);
  }
}
getData("http://localhost:3000/url1");
