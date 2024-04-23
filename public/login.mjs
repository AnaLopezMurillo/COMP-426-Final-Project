let loginForm = document.getElementById("PIDForm");

loginForm.addEventListener("submit", (e) => {
  let PID = Number(document.getElementById("PID").value);
  let PIDString = document.getElementById("PID").value;

  console.log(typeof PID);

  if (PIDString.length !== 9) {
    alert("PID must be 9 characters long!");
    e.preventDefault();
    return;
  } 
  if (typeof PID !== 'number') {
    alert("Please enter a valid PID.");
    e.preventDefault();
    return;
  }

  console.log(PIDString.length);

  console.log(PID);
  e.preventDefault();
  window.location.href = 'http://localhost:3000/weather';

})