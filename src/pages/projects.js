import { navigate } from '@reach/router';
import { graphql, Link } from 'gatsby';
import { useIsJsEnabled } from 'gatsby-plugin-js-fallback';
import React from 'react';
import { Button } from '../components/Button';
import { Card, CardActions, CardContent, CardImage } from '../components/Card';
import { Dialog } from '../components/dialog';
import { HashLink } from '../components/hash-link';
import { MainContent } from '../components/main-content';
import { OutLink } from '../components/OutLink';
import { PageTitleContainer } from '../components/page-title-container';
import { Seo } from '../components/Seo';
import './projects.scss';
import styles from './projects.module.scss';
import { preloadImage } from '../helper';

const ProjectCard = ({ project }) => (
  <Card className="ProjectPage--project" role="listitem">
    <div>
      <CardContent>
        <h2 id={project.id}>{project.name}</h2>
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
  <div className="ProjectPage--project-container" role="list">
    {projects.map(({ node }) => (
      <ProjectCard project={node} key={node.id} />
    ))}
  </div>
);

const usePreloadImage = imageSrc => {
  const [hovered, setHovered] = React.useState(false);
  const started = React.useRef(false);

  React.useEffect(() => {
    if (hovered && !started.current) {
      preloadImage(imageSrc);
      started.current = true;
    }
  }, [imageSrc, hovered]);

  return () => setHovered(true);
};

const FancyProjectCard = ({ project, location }) => {
  const [showDialog, setShowDialog] = React.useState(
    location.hash === `#${project.id}`
  );
  const isInternalLink = project.links.live && project.links.live[0] === '/';
  const onHover = usePreloadImage(project.image.publicURL);

  return (
    <li>
      <Card
        as={HashLink}
        target={project.id}
        selectable
        role="button"
        aria-haspopup="dialog"
        onMouseEnter={onHover}
        onFocus={onHover}
        onSelect={() => setShowDialog(true)}
        className="ProjectPage--project-card"
      >
        <CardContent className="text-center content-section">
          {project.name}
        </CardContent>
      </Card>
      <Dialog
        isOpen={showDialog}
        onDismiss={() => {
          setShowDialog(false);
          navigate(location.pathname, { replace: true });
        }}
        large
      >
        <div className={styles.details}>
          <div className={`content-section ${styles.content}`}>
            <h2 id={project.id}>{project.name}</h2>
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
    </li>
  );
};

const FancyProjectView = ({ projects, location }) => (
  <ul className="ProjectPage--project-grid-container">
    {projects.map(({ node }) => (
      <FancyProjectCard project={node} location={location} key={node.id} />
    ))}
  </ul>
);

const ProjectPage = ({ data: { allProjects }, location }) => {
  const isRendered = useIsJsEnabled();

  return (
    <div className="ProjectPage">
      <Seo title="Past Projects" />
      <MainContent as="div">
        <main>
          <PageTitleContainer title="Past Projects" />
          {isRendered ? (
            <FancyProjectView
              projects={allProjects.edges}
              location={location}
            />
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
          id
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
