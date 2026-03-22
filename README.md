# WebBasics.

WebBasics is a premium, handcrafted blog and educational platform designed to teach the fundamentals of web development. Built strictly with core web technologies—**Vanilla HTML, CSS, and JavaScript**—with a lightweight **Node.js backend** to handle persistent interactive state like comments.

## 🚀 Features

- **Pro Layout & Design:** Modern UI principles including CSS Grids, Flexbox layouts, beautiful typography, SVG illustrations, and polished hover micro-interactions.
- **Fully Responsive:** Gracefully scales from wide desktop monitors down to mobile viewports using thoughtful `@media` query breakpoints.
- **Dynamic Content Engine:** Blog content mapped from localized arrays with previous/next internal article routing.
- **Interactive Comment System:** Users can leave comments on the site. A minimal Node.js server (`server.js`) intercepts form submissions to persist data dynamically into `comment.json`, demonstrating full-stack capability within a strictly vanilla front-end environment.
- **Smooth Navigation:** Utilizing CSS `scroll-behavior: smooth` and scroll margins to elegantly step through the page architecture (Articles, About, Comment Sections).

## 📂 Project Structure

```text
/
├── index.html          # Main landing page (Hero, Articles Grid, About, Comments)
├── style.css           # Global styled layout and core component systems
├── script.js           # Frontend data fetching, comment logic, and DOM manipulation
├── server.js           # Lightweight Node backend for serving assets and writing comment JSON
├── comment.json        # Database file storing user comments
├── article.json        # Reference payload demonstrating article structure
├── img/                # Contains vector `.svg` illustrations used in the design
└── pages/
    ├── 1/              # Article 1 Route, Index, and Styles
    ├── 2/              # Article 2 Route, Index, and Styles
    └── 3/              # Article 3 Route, Index, and Styles
```

## 🛠️ How to View & Run

Because the project includes an interactive state manager (reading and writing to `comment.json`), you must run it through the bundled local Node.js server rather than a static `file:///` protocol.

**Steps to run locally:**
1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Open your terminal and navigate to the root directory `C:/Users/Sumeet/Desktop/FSD`.
3. Start the application:
   ```bash
   node server.js
   ```
4. Look in the console for the local port it spins up on (typically `http://localhost:3000`).
5. Open your browser and navigate to the deployed localhost link.

## 💡 Technical Highlights

- **CSS:** Makes heavy use of modern standards like `calc(100vh - 80px)` centering, dynamic `grid-template-columns`, `scroll-margin-top` for fixed anchor behaviors.
- **JS Frontend:** Manages asynchronous `promises` via `fetch()`, manually parses the DOM with `insertAdjacentHTML()`, and relies on specific reverse mapping algorithms (`slice(-3).reverse()`) to handle UI rendering constraints natively.
- **Node Backend:** Strictly leverages core Native modules like `http` and `fs`. It circumvents heavy frameworks like Express to demonstrate routing and raw POST intercept logic manually.

## 🎨 Theme & Typography

- **Fonts Used:** Primary font mapping relies on elegant sans-serif stacks with customized `uppercase` kerning logic for form tags, ensuring high readability and a professional premium feel. 
- **Colors:** Deep high-contrast shades (`#111` blacks, crisp `#fff` whites) highlighted by a vibrant custom orange (`#F28705` and `#F24405`).
