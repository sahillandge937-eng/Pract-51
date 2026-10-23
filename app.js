const workoutInput = document.getElementById("workout");
const durationInput = document.getElementById("duration");
const addButton = document.getElementById("addWorkout");
const historyList = document.getElementById("history");
const caloriesText = document.getElementById("calories");
const minutesText = document.getElementById("minutes");
const message = document.getElementById("message");

let workouts = JSON.parse(localStorage.getItem("pulseWorkouts") || "[]");

function renderWorkouts() {
  historyList.innerHTML = "";
  let totalMinutes = 0;
  let totalCalories = 0;

  workouts.forEach((item) => {
    totalMinutes += item.minutes;
    totalCalories += item.minutes * 5;

    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.minutes} minutes`;
    historyList.appendChild(li);
  });

  minutesText.textContent = totalMinutes;
  caloriesText.textContent = totalCalories;
  localStorage.setItem("pulseWorkouts", JSON.stringify(workouts));
}

addButton.addEventListener("click", () => {
  const name = workoutInput.value.trim();
  const minutes = Number(durationInput.value);

  if (!name || !Number.isFinite(minutes) || minutes <= 0) {
    message.textContent = "Enter a workout name and valid minutes.";
    return;
  }

  workouts.push({ name, minutes });
  workoutInput.value = "";
  durationInput.value = "";
  message.textContent = "Workout added successfully!";
  renderWorkouts();
});

renderWorkouts();
