const express = require("express");
const app = express();

const tokens = [
  { name: "DOGEAI", price: 0.01 },
  { name: "SHIBX", price: 0.005 },
  { name: "MOONDOGE", price: 0.02 },
];

app.get("/", (req, res) => {
  res.send(
    <html>
    <head>
      <title>Doggy Market</title>
    </head>
    <body style="font-family: Arial; padding:20px;">
      <h1>🐶 Doggy Market</h1>

      <button onclick="connectWallet()">Connect Wallet</button>
      <p id="wallet"></p>

      <h2>DRC-20 Tokens</h2>
      <table border="1" cellpadding="10">
        <thead>
          <tr>
            <th>Token</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="table"></tbody>
      </table>

      <script>
        let wallet = null;

        function connectWallet() {
          wallet = "0xABC123...XYZ";
          document.getElementById("wallet").innerText = "Connected: " + wallet;
        }

        function buy(name) {
          alert("Bought " + name + " 🚀");
        }

        function sell(name) {
          alert("Sold " + name + " 💰");
        }

        async function load() {
          let res = await fetch('/api/tokens');
          let data = await res.json();

          let html = "";
          data.forEach(t => {
            html += \
              <tr>
                <td>\${t.name}</td>
                <td>\${t.price}</td>
                <td>
                  <button onclick="buy('\${t.name}')">Buy</button>
                  <button onclick="sell('\${t.name}')">Sell</button>
                </td>
              </tr>
            \;
          });

          document.getElementById("table").innerHTML = html;
        }

        load();
      </script>
    </body>
    </html>
  );
});

app.get("/api/tokens", (req, res) => {
  res.json(tokens);
});

app.listen(3000, () => {
  console.log("Running on http://localhost:3000");
});
