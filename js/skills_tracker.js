
  
let user = JSON.parse(localStorage.getItem("currentUser"));
let role = user ? user.role : null;

if (role === "faculty") {
    document.getElementById("roadmapContainer").innerHTML =
        "<p>Skill Tracker is a student-focused feature.</p>";
}
// 🔹 ROADMAP DATA
if (role === "student") {
let roadmap = {
    "Web Dev": [
        { step: "HTML Basics", done: true },
        { step: "CSS", done: true },
        { step: "JavaScript", done: false }
    ],
    "DSA": [
        { step: "Arrays", done: true },
        { step: "Linked List", done: false },
        { step: "Stack", done: false }
    ]
};


// 🔹 LOAD ROADMAP
function loadRoadmap() {
    const skill = document.getElementById("skillSelect").value;
    const container = document.getElementById("roadmapContainer");

    container.innerHTML = "";

    if (!skill || !roadmap[skill]) return;

    roadmap[skill].forEach((item, index) => {
        container.innerHTML += `
            <div class="card step">
                <input type="checkbox" 
                    ${item.done ? "checked" : ""} 
                    onchange="toggleStep('${skill}', ${index})">

                <span>${item.step}</span>
            </div>
        `;
    });

    // show progress
    let progress = calculateProgress(skill);

    container.innerHTML += `
        <div class="card">
            <h4>Progress: ${progress}%</h4>
        </div>
    `;
}


// 🔹 TOGGLE STEP (checkbox)
function toggleStep(skill, index) {
    roadmap[skill][index].done = !roadmap[skill][index].done;

    loadRoadmap(); // refresh UI
}


// 🔹 CALCULATE PROGRESS
function calculateProgress(skill) {
    let steps = roadmap[skill];

    let done = steps.filter(s => s.done).length;

    return Math.floor((done / steps.length) * 100);
}}