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

  // post the PID to the backend here

  e.preventDefault();
  // this is a placeholder, we want to actually change this based on the PID. 
  window.location.href = 'http://localhost:3000/weather';

})