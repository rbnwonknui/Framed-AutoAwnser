const url = window.location.href;

if (url === "https://framed.wtf/archive?day=") {
    fetch("https://raw.githubusercontent.com/rbnwonknui/Framed-AutoAwnser/refs/heads/main/Versions/Classic.js")
        .then(r => r.text())
        .then(r => eval(r));
} else if (url === "https://framed.wtf/archive/poster?day=") {
    fetch("https://raw.githubusercontent.com/rbnwonknui/Framed-AutoAwnser/refs/heads/main/Versions/Poster.js")
        .then(r => r.text())
        .then(r => eval(r));
} else if (url === "https://framed.wtf/archive/titleshot?day=") {
    fetch("https://raw.githubusercontent.com/rbnwonknui/Framed-AutoAwnser/refs/heads/main/Versions/Titleshot.js")
        .then(r => r.text())
        .then(r => eval(r));
} else {
    console.log("error")
}

