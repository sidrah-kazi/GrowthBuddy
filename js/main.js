let assignments = [
    { division: "SE-A", subject: "DSA", title: "HW 1", dueDate: "2026-04-05" }
];

let submissions = {
    "SE-A": {
        "DSA": {
            "HW 1": [
                { student: "Sid", file: "sid_hw1.pdf", status: "Submitted", marks: "" },
                { student: "Ali", file: "ali_hw1.pdf", status: "Submitted", marks: "" }
            ]
        }
    }
};

function renderAssignments() {
    const table = document.getElementById("assignmentTable");
    table.innerHTML = "";

    assignments.forEach(a => {
        table.innerHTML += `
            <tr>
                <td>${a.division}</td>
                <td>${a.subject}</td>
                <td>${a.title}</td>
                <td>${a.dueDate}</td>
                <td>
                    <button onclick="viewSubmissions('${a.division}','${a.subject}','${a.title}')">
                        View
                    </button>
                </td>
            </tr>
        `;
    });
}

function viewSubmissions(division, subject, title) {
    document.getElementById("submissionSection").style.display = "block";

    const table = document.getElementById("submissionTable");
    table.innerHTML = "";

    const data = submissions[division]?.[subject]?.[title] || [];

    data.forEach((s, index) => {
        table.innerHTML += `
            <tr>
                <td>${s.student}</td>
                <td>${s.file}</td>
                <td>${s.status}</td>
                <td><input type="number" id="marks-${index}"></td>
                <td>
                    <button onclick="giveMarks('${division}','${subject}','${title}',${index})">
                        Submit
                    </button>
                </td>
            </tr>
        `;
    });
}

function giveMarks(division, subject, title, index) {
    const marks = document.getElementById(`marks-${index}`).value;
    submissions[division][subject][title][index].marks = marks;
    alert("Marks saved!");
}

window.onload = function() {
    renderAssignments();
};