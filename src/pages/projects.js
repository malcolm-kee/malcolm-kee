import { graphql, Link } from 'gatsby';
import React from 'react';
import { Button } from '../components/Button';
import { Card, CardActions, CardContent, CardImage } from '../components/Card';
import { Dialog } from '../components/dialog';
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

const ProjectListView = ({ projects }) => (
  <div className="ProjectPage--project-container">
    {projects.map(({ node }) => (
      <ProjectCard project={node} key={node.name} />
    ))}
  </div>
);

const FancyProjectCard = ({ project }) => {
  const [showDialog, setShowDialog] = React.useState(false);

  return (
    <>
      <Card selectable onSelect={() => setShowDialog(true)}>
        <CardContent className="text-center content-section">
          {project.name}
        </CardContent>
      </Card>
      <Dialog isOpen={showDialog} onDismiss={() => setShowDialog(false)}>
        <div className="content-section">
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <ul>
            {project.technologies.map(tech => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
        <div className="ProjectPage--project-demo">
          <div className="ProjectPage--project-demo-links">
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
          </div>
          <div>
            <img
              src={project.image.publicURL}
              alt={`Demo of ${project.name}`}
              className="ProjectPage--project-demo-image"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

const FancyProjectView = ({ projects }) => (
  <div className="ProjectPage--project-grid-container">
    {projects.map(({ node }) => (
      <FancyProjectCard project={node} key={node.name} />
    ))}
  </div>
);

const ProjectPage = ({ data: { allProjects } }) => {
  const [isRendered, setIsRendered] = React.useState(false);

  React.useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <div className="ProjectPage">
      <Seo title="Past Projects" />
      <MainContent as="div">
        <main>
          <PageTitleContainer title="Past Projects" />
          {isRendered ? (
            <FancyProjectView projects={allProjects.edges} />
          ) : (
            <ProjectListView projects={allProjects.edges} />
          )}
        </main>
        <nav className="Toolbar center">
          <Link to="/" className="link-primary">
            Home
          </Link>
        </nav>
      </MainContent>
    </div>
  );
};

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
