const axios = require("axios");
const xmlbuilder = require("xmlbuilder");
const fs = require("fs");

// URL API yang ingin diambil
const apiUrl = "http://localhost:3001/books";

// Fungsi untuk mengambil data dari API dan mengubahnya menjadi XML
async function fetchAndConvertToXml() {
  try {
    // Mengambil data dari API JSON
    const response = await axios.get(apiUrl, {
      headers: { Accept: "application/json" }, // Pastikan permintaan JSON
    });
    const books = response.data;

    // Membuat XML dari data JSON
    const xml = xmlbuilder.create("books");
    books.forEach((book) => {
      xml
        .ele("book", { id: book.id })
        .ele("title", book.title)
        .up()
        .ele("author", book.author)
        .up();
    });

    // Menampilkan hasil XML ke console
    console.log(xml.end({ pretty: true }));

    // Menyimpan hasil XML ke dalam file books.xml
    fs.writeFileSync("books.xml", xml.end({ pretty: true }));
  } catch (error) {
    console.error("Error fetching data from API:", error.message); // Menampilkan pesan error
    console.error(
      "Error details:",
      error.response ? error.response.data : error
    ); // Menampilkan detail jika tersedia
  }
}

// Memanggil fungsi
fetchAndConvertToXml();
