import { graphql, Link } from 'gatsby';
import React from 'react';
import { Button } from '../components/Button';
import { Card, CardActions, CardContent, CardImage } from '../components/Card';
import { MainContent } from '../components/main-content';
import { OutLink } from '../components/OutLink';
import { PageTitleContainer } from '../components/page-title-container';
import { Seo } from '../components/Seo';
import './projects.scss';

const ProjectPage = ({ data: { allProjects } }) => (
  <div className="ProjectPage">
    <Seo title="Past Projects" />
    <MainContent as="div">
      <main>
        <PageTitleContainer title="Past Projects" />
        <div className="ProjectPage--project-container">
          {allProjects.edges.map(({ node }) => (
            <Card className="ProjectPage--project" key={node.name}>
              <div>
                <CardContent>
                  <h2>{node.name}</h2>
                  <p>{node.description}</p>
                  <ul>
                    {node.technologies.map(tech => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardActions className="ProjectPage--project-links">
                  {node.links.live && (
                    <Button
                      component={OutLink}
                      href={node.links.live}
                      color="primary"
                      raised
                    >
                      Live
                    </Button>
                  )}
                  {node.links.code && (
                    <Button component={OutLink} href={node.links.code} raised>
                      Code
                    </Button>
                  )}
                </CardActions>
              </div>
              <CardImage
                src={node.image.publicURL}
                className="ProjectPage--demo-image"
              />
            </Card>
          ))}
        </div>
      </main>
      <nav className="Toolbar center">
        <Link to="/" className="link-primary">
          Home
        </Link>
      </nav>
    </MainContent>
  </div>
);

export const query = graphql`
  query ProjectsPageQuery {
    allProjects: allProjectsJson {
      edges {
        node {
          name
          description
          technologies
          links {
            live
            code
          }
          image {
            publicURL
          }
        }
      }
    }
  }
`;

export default ProjectPage;
