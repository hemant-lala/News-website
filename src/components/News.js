import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const cap = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  document.title = `Newssy - ${cap(props.category)}`
  // ea998c9773044613ab5dc14408bb0aa8
  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(60);
    setarticles(parsedData.articles);
    const link = document.getElementsByClassName("nav-link");
    const current = document.getElementById(`${props.category}`)
    for (var i = 0; i < link.length; i++) {
      link[i].classList.remove('active');
    }
    current.classList.add('active');
    setloading(false);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
  }
  useEffect(() => {
    updateNews();
  }, [])

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(articles.concat(parsedData.articles))
    const link = document.getElementsByClassName("nav-link");
    const current = document.getElementById(`${props.category}`)
    for (var i = 0; i < link.length; i++) {
      link[i].classList.remove('active');
    }
    current.classList.add('active');
    setTotalResults(parsedData.totalResults)
  };
    return (
      <>
        <h2 className="text-center" style={{margin:'35px 0px', marginTop: '90px'}}>Newssy - Top Headlines - {cap(props.category)}</h2>
        {/* {loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          {articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title?element.title.slice(0,60):""}
                  description={element.description?element.description.slice(0,90):""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt.slice(0,10)}
                  time={element.publishedAt.slice(11,16)}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    );
}
News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general',
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News;
