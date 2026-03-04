# The Archives of Westeros: Character Explorer

> A high-performance, paginated character directory built with Vanilla JavaScript to efficiently manage and display massive JSON datasets.

### 📖 The Challenge
Handling large amounts of data on the frontend can quickly degrade performance and ruin the user experience. The goal of this project was to build a fluid, searchable, and filterable interface for hundreds of entities without freezing the browser or overwhelming the DOM.

### ⚙️ Under the Hood (Architecture)
* **Smart Data Fetching:** Instead of loading the entire universe at once, the application integrates with *An API of Ice and Fire* using a strict 50-item pagination system. This keeps memory usage low and rendering times fast.
* **Persistent State Management:** Ever clicked on a character's detail card, hit "back", and lost your search results? Not here. The app utilizes `sessionStorage` to memorize your exact scroll position and your active classification tabs (such as the GOT, HOTD, or AKOTSK eras).
* **Dual-Action Filtering:** The search engine doesn't just look for names; it simultaneously cross-references character titles, updating the UI instantly via dynamic DOM manipulation.

### 🚀 How to Run
No complex build tools or `npm install` required. This is a pure Vanilla JS application. Simply download the files and open `index.html` in any modern web browser to start exploring the archives.
