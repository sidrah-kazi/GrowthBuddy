document.querySelectorAll(".notification-item").forEach(item => {
  item.addEventListener("click", () => {
    item.classList.remove("unread");
  });
});