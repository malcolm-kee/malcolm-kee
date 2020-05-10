import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import * as React from 'react';
import { MainContent } from '../components/main-content';
import { OutLink } from '../components/OutLink';
import { PageTitleContainer } from '../components/page-title-container';
import { Seo } from '../components/Seo';
import styles from './recordings.module.scss';

export default function Recordings({ data }) {
  return (
    <>
      <Seo title="Recordings by Malcolm Kee" />
      <MainContent>
        <PageTitleContainer title="Recordings" />
        <ul className="max-w-4xl mx-auto px-2 sm:px-4">
          {data.videos.nodes.map((video) => (
            <li key={video.videoId} className="mb-8">
              <div className="text-sm">
                <time dateTime={video.publishedAt}>{video.date}</time>
              </div>
              <OutLink
                to={`https://youtube.com/watch?v=${video.videoId}`}
                className="sm:float-right sm:pl-2"
              >
                <Image
                  fixed={video.localThumbnail.childImageSharp.fixed}
                  className={styles.img}
                />
              </OutLink>
              <h2 className="text-2xl">
                <OutLink
                  to={`https://youtube.com/watch?v=${video.videoId}`}
                  className="link"
                >
                  {video.title}
                </OutLink>
              </h2>
              <p className="whitespace-pre-wrap">{video.description}</p>
              <div className="clearfix" />
            </li>
          ))}
        </ul>
      </MainContent>
    </>
  );
}

export const query = graphql`
  {
    videos: allYoutubeVideo(sort: { fields: publishedAt, order: DESC }) {
      nodes {
        title
        date: publishedAt(formatString: "DD MMM YYYY")
        publishedAt
        videoId
        description
        localThumbnail {
          childImageSharp {
            fixed(width: 300) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
    }
  }
`;
