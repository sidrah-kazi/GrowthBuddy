  
let user = JSON.parse(localStorage.getItem("currentUser"));
let role = user ? user.role : null;
function fetchLeaderboardData() {
    // 🔥 For now → dummy data
    let data = [
        { name: "Sid", score: 8 },
        { name: "Ali", score: 6 },
        { name: "Ayesha", score: 9 }
    ];

    renderLeaderboard(data);
}
function renderLeaderboard(data) {
    const table = document.getElementById("leaderboardTable");

    // sort
    data.sort((a, b) => b.score - a.score);

    table.innerHTML = "";

    data.forEach((student, index) => {
        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.score}</td>
            </tr>
        `;
    });
}
window.onload = function() {
    fetchLeaderboardData();

    if (role === "student") {
        document.getElementById("facultyControls").style.display = "none";
    }
};