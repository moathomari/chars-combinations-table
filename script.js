function generateCombinations() {
  const charCountInput = document.getElementById("charCount");
  const charCount = parseInt(charCountInput.value, 10);

  if (isNaN(charCount) || charCount < 1) {
    alert("Please enter a valid number of characters greater than 0.");
    return;
  }

  const alphabet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let totalCount = 0; // Variable to store the total count

  function generateCombination(prefix, remainingLength) {
    if (remainingLength === 0) {
      totalCount++;
      return `
                <tr>
                    <td>${totalCount}</td>
                    <td>${prefix}</td>
                </tr>
            `;
    }

    let combinations = "";
    for (let i = 0; i < alphabet.length; i++) {
      const combination = generateCombination(
        prefix + alphabet[i],
        remainingLength - 1
      );
      combinations += combination;
    }
    return combinations;
  }

  document.getElementById("tables-container").innerHTML = ""; // Clear previous tables
  for (let i = 0; i < alphabet.length; i++) {
    const character = alphabet[i];
    totalCount = 0; // Reset totalCount for each character
    const table = document.createElement("table");
    table.innerHTML = `
            <tr>
                <th colspan="2">${character}</th>
            </tr>
            <tr>
                <th>#</th>
                <th>Combination</th>
            </tr>
        `;

    const combinations = generateCombination(character, charCount - 1);
    table.innerHTML += combinations;

    document.getElementById("tables-container").appendChild(table);
  }

  // Display the total count in the HTML element
  document.getElementById("total-count").textContent =
    totalCount * alphabet.length;
}
