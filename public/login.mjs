let loginForm = document.getElementById("PIDForm");

loginForm.addEventListener("submit", async (e) => {
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

  try {
    await fetch("http://localhost:3000/user", {
          method: "POST",
          body: JSON.stringify({
            pid: PID
          })
      });

      window.location.href = 'http://localhost:3000/weather?pid=' + PID;
      
  } catch(error) {
    console.error("Failed to post PID", error);
    e.preventDefault();
  }
})