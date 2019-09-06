import { graphql, Link } from 'gatsby';
import { useIsJsEnabled } from 'gatsby-plugin-js-fallback';
import React from 'react';
import { Button } from '../components/Button';
import { Card, CardActions, CardContent, CardImage } from '../components/Card';
import { Dialog } from '../components/dialog';
import { MainContent } from '../components/main-content';
import { OutLink } from '../components/OutLink';
import { PageTitleContainer } from '../components/page-title-container';
import { Seo } from '../components/Seo';
import './projects.scss';
import styles from './projects.module.scss';
import { preloadImage } from '../helper';

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
      <CardActions>
        {project.links.live && (
          <Button
            component={OutLink}
            href={project.links.live}
            color="primary"
            className={styles.btn}
            raised
          >
            Live
          </Button>
        )}
        {project.links.code && (
          <Button
            component={OutLink}
            href={project.links.code}
            raised
            className={styles.btn}
          >
            Code
          </Button>
        )}
      </CardActions>
    </div>
    {project.image && (
      <CardImage
        src={project.image.publicURL}
        className="ProjectPage--demo-image"
      />
    )}
  </Card>
);

const ProjectListView = ({ projects }) => (
  <div className="ProjectPage--project-container">
    {projects.map(({ node }) => (
      <ProjectCard project={node} key={node.name} />
    ))}
  </div>
);

const usePreloadImage = imageSrc => {
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    if (hovered) {
      preloadImage(imageSrc);
    }
  }, [imageSrc, hovered]);

  return () => setHovered(true);
};

const FancyProjectCard = ({ project }) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const isInternalLink = project.links.live && project.links.live[0] === '/';
  const onHover = usePreloadImage(project.image.publicURL);

  return (
    <>
      <Card
        selectable
        onMouseEnter={onHover}
        onFocus={onHover}
        onSelect={() => setShowDialog(true)}
        className="ProjectPage--project-card"
      >
        <CardContent className="text-center content-section">
          {project.name}
        </CardContent>
      </Card>
      <Dialog isOpen={showDialog} onDismiss={() => setShowDialog(false)} large>
        <div className={styles.details}>
          <div className={`content-section ${styles.content}`}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <ul>
              {project.technologies.map(tech => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <div>
              {project.links.live && (
                <Button
                  component={isInternalLink ? Link : OutLink}
                  href={isInternalLink ? undefined : project.links.live}
                  to={isInternalLink ? project.links.live : undefined}
                  color="primary"
                  raised
                  className={styles.btn}
                >
                  Live
                </Button>
              )}
              {project.links.code && (
                <Button
                  component={OutLink}
                  href={project.links.code}
                  raised
                  className={styles.btn}
                >
                  Code
                </Button>
              )}
            </div>
          </div>
          <div className={styles.demo}>
            {project.image && (
              <img
                src={project.image.publicURL}
                alt={`Demo of ${project.name}`}
                className={styles.image}
              />
            )}
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
  const isRendered = useIsJsEnabled();

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
