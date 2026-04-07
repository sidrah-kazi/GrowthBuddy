// 🔹 SIGNUP
const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.querySelector('input[name="user_id"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirm_password"]').value;
    const department = document.getElementById("department").value;
    const year = document.getElementById("year").value;
    const division = document.getElementById("division").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    const exists = students.find(user => user.username === username);
    if (exists) {
      alert("Username already exists!");
      return;
    }

    const newUser = {
      username,
      email,
      password,
      department,
      year,
      division
    };

    students.push(newUser);
    localStorage.setItem("students", JSON.stringify(students));

    localStorage.setItem("currentUser", JSON.stringify({
      username: username,
      role: "student"
    }));

    window.location.href = "../student/dashboard.html";
  });
}


// 🔹 LOGIN
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Faculty
    const facultyList = [
      { username: "teacher1", password: "1234" },
      { username: "teacher2", password: "abcd" }
    ];

    const faculty = facultyList.find(f =>
      f.username === username && f.password === password
    );

    if (faculty) {
  localStorage.setItem("currentUser", JSON.stringify({
    username: username,
    role: "faculty"
  }));

  localStorage.setItem("role", "faculty"); // ✅ ADD THIS

  window.location.href = "../dashboards/faculty_dashboard.html";
  return;
}

    // Students
    const students = JSON.parse(localStorage.getItem("students")) || [];

    const student = students.find(s =>
      s.username === username && s.password === password
    );

    if (student) {
  localStorage.setItem("currentUser", JSON.stringify({
    username: username,
    role: "student"
  }));

  localStorage.setItem("role", "student"); // ✅ FIXED

  window.location.href = "../dashboards/student_dashboard.html";
}
 else {
      alert("Invalid username or password");
    }
  });
}