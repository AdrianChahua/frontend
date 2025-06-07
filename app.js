const API_URL = "http://localhost:8000"; // cambia esto si la API está en otro host

document.getElementById("add-student-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const response = await fetch(`${API_URL}/students`, {
    method: "POST",
    body: formData
  });

  const result = await response.text();
  alert(result);
  fetchStudents();
  e.target.reset();
});

async function fetchStudents() {
  const response = await fetch(`${API_URL}/students`);
  const students = await response.json();

  const list = document.getElementById("students-list");
  list.innerHTML = "";

  students.forEach(student => {
    const li = document.createElement("li");
    li.textContent = `#${student.id} - ${student.firstname} ${student.lastname} | ${student.gender} | ${student.age}`;
    list.appendChild(li);
  });
}

async function getStudent() {
  const id = document.getElementById("student-id").value;
  const res = await fetch(`${API_URL}/student/${id}`);
  if (!res.ok) return alert("Not found");
  const student = await res.json();
  alert(`Student: ${student[1]} ${student[2]}, Gender: ${student[3]}, Age: ${student[4]}`);
}

async function deleteStudent() {
  const id = document.getElementById("student-id").value;
  const res = await fetch(`${API_URL}/student/${id}`, { method: "DELETE" });
  const text = await res.text();
  alert(text);
  fetchStudents();
}

async function updateStudent() {
  const id = document.getElementById("student-id").value;
  const formData = new FormData();
  formData.append("firstname", document.getElementById("update-firstname").value);
  formData.append("lastname", document.getElementById("update-lastname").value);
  formData.append("gender", document.getElementById("update-gender").value);
  formData.append("age", document.getElementById("update-age").value);

  const res = await fetch(`${API_URL}/student/${id}`, {
    method: "PUT",
    body: formData
  });

  const data = await res.json();
  alert("Updated: " + JSON.stringify(data));
  fetchStudents();
}
