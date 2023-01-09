import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import * as React from 'react';
import { MainContent } from '../components/main-content';
import { OutLink } from '../components/OutLink';
import { Seo } from '../components/Seo';

export default function Recordings({ data }) {
  return (
    <div className="px-4 md:px-8 py-3">
      <Seo title="Recordings by Malcolm Kee" />
      <MainContent>
        <div className="text-center my-6">
          <h1 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Recordings
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
            Recordings of my webcasts/sharings
          </p>
        </div>
        <ul className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-2 lg:max-w-none">
          {data.videos.nodes.map((video) => (
            <li
              className="block rounded-lg shadow-lg overflow-hidden"
              key={video.videoId}
            >
              <OutLink
                to={`https://youtube.com/watch?v=${video.videoId}`}
                className="block bg-white h-full group py-4"
              >
                <div className="text-center mb-2 px-4">
                  <h2 className="text-2xl font-semibold leading-7 group-hover:underline">
                    {video.title}
                  </h2>
                  <div className="text-sm">
                    <time dateTime={video.publishedAt}>{video.date}</time>
                  </div>
                </div>
                <div className="lg:px-4">
                  <div
                    to={`https://youtube.com/watch?v=${video.videoId}`}
                    className="text-center max-h-64 mb-3 overflow-hidden lg:float-right lg:w-1/2 lg:pl-2"
                  >
                    <Image
                      fluid={video.localThumbnail.childImageSharp.fluid}
                      className="rounded overflow-hidden -mt-10 lg:mt-0"
                    />
                  </div>
                  <p className="px-4 lg:px-0 md:whitespace-pre-wrap">
                    {video.description}
                  </p>
                  <div className="clearfix" />
                </div>
              </OutLink>
            </li>
          ))}
        </ul>
      </MainContent>
    </div>
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
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
