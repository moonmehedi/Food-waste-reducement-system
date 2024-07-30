document.addEventListener("DOMContentLoaded", async () => {
    const table = document.getElementById("donation-history-table");

    try {
        const response = await fetch('http://localhost:5000/admin/donation-history');
        const donations = await response.json();
        console.log(donations);
        donations.forEach((donation, index) => {
            const row = table.insertRow();
            row.innerHTML = `
               <td>${index + 1}</td>
                <td>${donation[0]}</td>
                <td>${donation[1]}</td>
                <td><img src="data:image/jpeg;base64,${donation[2]}" alt="${donation[1]}" class="food-image"></td>
                <td>${donation[3]}</td>
                <td>${new Date(donation[4]).toLocaleDateString()}</td>
                <td>${donation[5]}</td>
                <td>${donation[6]}</td>
                <td>${donation[7]}</td>
                 <td>${new Date(donation[8]).toLocaleDateString()}</td>
            `;
        });
    } catch (error) {
        console.error("Failed to fetch donation history:", error);
    }
});
