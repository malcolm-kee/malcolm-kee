import { graphql, Link } from 'gatsby';
import React from 'react';
import { Button } from '../components/Button';
import { Card, CardActions, CardContent, CardImage } from '../components/Card';
import { MainContent } from '../components/main-content';
import { OutLink } from '../components/OutLink';
import { PageTitleContainer } from '../components/page-title-container';
import { Seo } from '../components/Seo';
import './projects.scss';

const ProjectCard = ({ project }) => (
  <Card className="ProjectPage--project">
    <div>
      <CardContent>
        <h2>{project.name}</h2>
        <p>{project.description}</p>
        <ul>
          {project.technologies.map(tech => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </CardContent>
      <CardActions className="ProjectPage--project-links">
        {project.links.live && (
          <Button
            component={OutLink}
            href={project.links.live}
            color="primary"
            raised
          >
            Live
          </Button>
        )}
        {project.links.code && (
          <Button component={OutLink} href={project.links.code} raised>
            Code
          </Button>
        )}
      </CardActions>
    </div>
    <CardImage
      src={project.image.publicURL}
      className="ProjectPage--demo-image"
    />
  </Card>
);

const ProjectPage = ({ data: { allProjects } }) => (
  <div className="ProjectPage">
    <Seo title="Past Projects" />
    <MainContent as="div">
      <main>
        <PageTitleContainer title="Past Projects" />
        <div className="ProjectPage--project-container">
          {allProjects.edges.map(({ node }) => (
            <ProjectCard project={node} key={node.name} />
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
