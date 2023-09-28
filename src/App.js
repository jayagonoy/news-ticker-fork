import "./styles.css";
import Marquee from "react-fast-marquee";
import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
const mediumRssFeed =
  "https://api.rss2json.com/v1/api.json?rss_url=https://vtubernewsdrop.com/feed";

const App = () => {
  const MAX_ARTICLES = 8;

  const [articles, setArticles] = useState();

  useEffect(() => {
    const loadArticles = async () => {
      fetch(mediumRssFeed, { headers: { Accept: "application/json" } })
        .then((res) => res.json())
        .then((data) => data.items.filter((item) => item.title.length > 0))
        .then((newArticles) => newArticles.slice(0, MAX_ARTICLES))
        .then((articles) => setArticles(articles))
        .catch((error) => console.log(error));
    };

    loadArticles();
  }, [MAX_ARTICLES]);

  return (
    <Marquee speed="100" gradient="">
      <Container>
        {articles
          ? articles.map((item) => (
              <Typography variant="inherit" component="span">
                {item.title} &bull;&nbsp;
              </Typography>
            ))
          : "Read more stories on VTuberNewsDrop.com"}
      </Container>
    </Marquee>
  );
};

export default App;
