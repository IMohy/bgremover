import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Helmet>
            <title>Remove It Easy - Online Background Remover</title>
            <meta
              name="description"
              content="Remove backgrounds from images quickly and easily with our online tool. Perfect for professionals and casual users alike."
            />
            <meta name="keywords" content="background remover, image editing, photo editor, remove background online" />
            <meta property="og:title" content="Remove It Easy - Online Background Remover" />
            <meta
              property="og:description"
              content="Remove backgrounds from images quickly and easily with our online tool."
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://removeiteasy.com" />
            <meta property="og:image" content="/src/assets/logo-white.svg" />
            <link rel="canonical" href="https://removeiteasy.com" />
          </Helmet>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
