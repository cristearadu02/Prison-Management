document.getElementById("security-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Check if the security answer is correct
    const answer = document.getElementById("answer").value;
    
    
    if (isSecurityAnswerCorrect(answer)) {
      document.getElementById("security-form").classList.add("hidden");
      document.getElementById("message").classList.add("hidden");
      document.getElementById("password-form").classList.remove("hidden");
    } 
    else 
    {
      alert("Incorrect answer.");
    }
  });
  
  function isSecurityAnswerCorrect(answer) {
    // Replace this condition with your actual security answer check
    return "correctAnswer" === "correctAnswer";
  }
  
  document.getElementById("password-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
  
    if (newPassword === confirmPassword) {
      // Submit the new password and handle success or error
      alert("New password submitted!");
    } else {
      alert("Passwords do not match. Please try again.");
    }
  });




  function navigateToLink(path) {
    window.location.href = path;
  }