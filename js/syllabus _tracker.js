// 🔹 ROLE (change to "student" to test student view)
  
let user = JSON.parse(localStorage.getItem("currentUser"));
let role = user ? user.role : null;


// 🔹 SYLLABUS DATA (Dummy Data)
let syllabus = {
    "SE-A": {
        "DSA": 70,
        "DBMS": 50,
        "Python": 90
    },
    "SE-B": {
        "DSA": 40,
        "DBMS": 60
    },
    "TE-A": {
        "ML": 30,
        "AI": 80
    }
};


// 🔹 LOAD SYLLABUS (runs when division is selected)
function loadSyllabus() {
    const division = document.getElementById("division").value;
    const container = document.getElementById("syllabusContainer");

    container.innerHTML = "";

    if (!division || !syllabus[division]) return;

    Object.keys(syllabus[division]).forEach(subject => {
        let progress = syllabus[division][subject];

        // 🎨 Color Logic
        let color = "green";
        if (progress < 40) color = "red";
        else if (progress < 70) color = "orange";

        let html = `
            <div class="card subject-card">
                <h4>${subject}</h4>

                <div class="progress-bar">
                    <div class="progress-fill" 
                         style="width:${progress}%; background:${color};">
                    </div>
                </div>

                <p>${progress}% completed</p>
        `;

        // 👩‍🏫 Faculty can update
        if (role === "faculty") {
            html += `
                <input type="number" id="${subject}" 
                       value="${progress}" min="0" max="100">
                <button onclick="updateProgress('${division}','${subject}')">
                    Update
                </button>
            `;
        }

        html += `</div>`;

        container.innerHTML += html;
    });

    updateChart(division);
}


// 🔹 UPDATE PROGRESS (Faculty only)
function updateProgress(division, subject) {
    const newValue = document.getElementById(subject).value;

    syllabus[division][subject] = parseInt(newValue);

    loadSyllabus(); // refresh UI
}


// 🔹 CHART.JS
let chart;

function updateChart(division) {
    const data = syllabus[division];

    const labels = Object.keys(data);
    const values = Object.values(data);

    const ctx = document.getElementById("syllabusChart").getContext("2d");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Syllabus Completion %",
                data: values
            }]
        }
    });
}