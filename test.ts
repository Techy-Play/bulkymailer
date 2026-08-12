const { renderToMjml } = require("@templatical/renderer");
console.log(renderToMjml({
  settings: { width: 600, backgroundColor: "#fff", textColor: "#000", linkUnderline: true, fontFamily: "Arial", locale: "en" },
  blocks: [
    {
      id: "1", type: "image", src: "https://example.com/img.jpg", alt: "Test", width: "full", align: "center",
      styles: { padding: { top: 10, right: 10, bottom: 10, left: 10 } },
      borderRadius: 12, border: "2px solid red"
    }
  ]
}));
