async function fetch(url, options) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      method: "GET",
      ...(options || {})
    })
      .done(function(data) {
        resolve({
          json: () => Promise.resolve(data)
        });
      })
      .fail(reject);
  });
}

async function getCoinList() {
  console.log("getCoinList");
  const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=1");
  const data = await response.json();
  const sliced = Array.from(data).slice(0, 100);

  return sliced;
}

 async function getCoinDetail(id){
  console.log("getCoinDetail");

  const safeId = /\w+/.exec(id);
  const urlScheme = new URL(`https://api.coingecko.com/api/v3/coins/${safeId}`);

  const response = await fetch(urlScheme.toString());
  const data = await response.json();

  return data;

  // TODO: Implement urlScheme arguments
  // ?vs_currency=usd&per_page=100&page=1
  
 }
