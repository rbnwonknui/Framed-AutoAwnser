const url = window.location.href;

if (url.includes("https://framed.wtf/archive?day=") && !url.includes("/poster") && !url.includes("/titleshot") && !url.includes("/one-frame")) {
    fetch("https://raw.githubusercontent.com/danillucas/Framed-AutoAwnser/main/Versions/Classic.js")
        .then(r => r.text())
        .then(r => eval(r));
} else if (url.includes("https://framed.wtf/archive/poster?day=")) {
    fetch("https://raw.githubusercontent.com/danillucas/Framed-AutoAwnser/main/Versions/Poster.js")
        .then(r => r.text())
        .then(r => eval(r));
} else if (url.includes("https://framed.wtf/archive/titleshot?day=")) {
    fetch("https://raw.githubusercontent.com/danillucas/Framed-AutoAwnser/main/Versions/Titleshot.js")
        .then(r => r.text())
        .then(r => eval(r));
} else if (url.includes("https://framed.wtf/archive/one-frame?day=")) {
    fetch("https://raw.githubusercontent.com/danillucas/Framed-AutoAwnser/main/Versions/Oneframe.js")
        .then(r => r.text())
        .then(r => eval(r));
} else {
    window.location.href = "https://framed.wtf/"; 
}
