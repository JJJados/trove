import "./app.css";
import tabs from "./components/tabs.svelte";

const target = document.getElementById("app");

async function render() {
  if (target) {
    new tabs({ target });
  }
}

document.addEventListener("DOMContentLoaded", render);
