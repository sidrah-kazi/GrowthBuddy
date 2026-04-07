fetch("../components/navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
  });

fetch("../components/sidebar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("sidebar").innerHTML = data;
  
let user = JSON.parse(localStorage.getItem("currentUser"));
let role = user ? user.role : null;

console.log("Role:", role);

let assignmentLink = document.getElementById("assignment-link");

if (role === "faculty") {
    assignmentLink.href = "../academics/assignment_faculty.html";
} else {
    assignmentLink.href = "../academics/assignment_student.html";
}
  });

fetch("../components/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });
