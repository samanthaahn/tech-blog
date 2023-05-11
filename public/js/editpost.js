const unorderedList = document.querySelector(".post-list");

unorderedList.addEventListener("click", async (event) => {
  if (event.target.getAttribute("class") === "editlink") {
    event.target.previousElementSibling.previousElementSibling.removeAttribute(
      "disabled"
    );
    event.target.previousElementSibling.removeAttribute("disabled");
    event.target.nextElementSibling.classList.remove("hide");
  }
  if (event.target.getAttribute("class") === "submitlink") {
    const title =
      event.target.previousElementSibling.previousElementSibling
        .previousElementSibling.value;
    const content =
      event.target.previousElementSibling.previousElementSibling.value;

    const postId = event.target.getAttribute("postId");

    const response = await fetch(`/api/posts/edit/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    }).catch((error) => console.error("Error", error));

    if (response.ok) {
      document.location.reload(true);
    } else {
      alert("Failed to update post, try again!");
    }
  }
  if (event.target.getAttribute("class") === "deletelink") {
    const postId = event.target.previousElementSibling.getAttribute("postId");
    const response = await fetch(`/api/posts/delete/${postId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Could not delete post. Try again!");
    }
  }
});
