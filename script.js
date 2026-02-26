fetch("tasks.json?ts=" + Date.now())
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("tasks");
    container.innerHTML = "";

    if (!data.length) {
        container.innerHTML = "<p>No tasks for today.</p>";
        return;
    }

    data.forEach(task => {
        const div = document.createElement("div");
        div.className = "task";

        if (task.IsOverdue === true) {
            div.classList.add("overdue");
        }

        div.innerHTML = `
            <h3>${task.Item}</h3>
            <p><strong>Qty:</strong> ${task.Qty}</p>
            <p><strong>Due:</strong> ${task.DueTime ?? "N/A"}</p>
            <p><strong>Station:</strong> ${task.Station}</p>
        `;

        container.appendChild(div);
    });
  })
  .catch(err => {
    document.getElementById("tasks").innerHTML =
      "<p style='color:red;'>No tasks.json found.</p>";
  });
