import { navigate } from '@reach/router';
import { graphql, Link } from 'gatsby';
import { useIsJsEnabled } from 'gatsby-plugin-js-fallback';
import * as React from 'react';
import { isDefined } from 'typesafe-is';
import { Button, RoundedLinkButton } from '../components/Button';
import { Card, CardActions, CardContent, CardImage } from '../components/Card';
import { Dialog } from '../components/dialog';
import { GifPlayer } from '../components/gif-player';
import { HashLink } from '../components/hash-link';
import { MainContent } from '../components/main-content';
import { OutLink } from '../components/OutLink';
import { Seo } from '../components/Seo';
import { Ul } from '../components/ul';
import { preloadImage } from '../helper';
import styles from './projects.module.scss';
import './projects.scss';

const ProjectCard = ({ project }) => (
  <Card className="ProjectPage--project" role="listitem">
    <div>
      <CardContent>
        <h2 id={project.id}>{project.name}</h2>
        <p>{project.description}</p>
        <ul>
          {project.technologies.map((tech) => (
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
    {project.staticImage && (
      <CardImage
        src={project.staticImage.publicURL}
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

const usePreloadImage = (imageSrc) => {
  const [shouldPreload, setShouldPreload] = React.useState(false);
  const started = React.useRef(false);

  React.useEffect(() => {
    if (shouldPreload && !started.current && imageSrc) {
      preloadImage(imageSrc);
      started.current = true;
    }
  }, [imageSrc, shouldPreload]);

  return () => setShouldPreload(true);
};

const FancyProjectCard = ({ project, onActivate }) => {
  const preloadStaticImage = usePreloadImage(
    project.staticImage && project.staticImage.publicURL
  );

  return (
    <li>
      <Card
        as={HashLink}
        target={project.id}
        selectable
        role="button"
        aria-haspopup="dialog"
        onMouseEnter={preloadStaticImage}
        onFocus={preloadStaticImage}
        onSelect={onActivate}
        className="ProjectPage--project-card"
      >
        <CardContent className="text-center text-lg content-section">
          {project.name}
        </CardContent>
      </Card>
    </li>
  );
};

/**
 *
 * @param {Array} projects
 * @param {Location} location
 */
const useProjects = (projects, location) => {
  const [focused, setFocusedIndex] = React.useState(() => {
    const matchIndex = projects.findIndex(
      (project) => `#${project.node.id}` === location.hash
    );
    return matchIndex > -1 ? matchIndex : undefined;
  });

  React.useEffect(() => {
    if (typeof focused === 'undefined') {
      navigate(location.pathname, { replace: true });
    }
  }, [focused, location.pathname]);

  return {
    focused,
    setFocused: (index) => {
      setFocusedIndex(index);
      if (isDefined(index)) {
        navigate(`#${projects[index].node.id}`, { replace: true });
      }
    },
    next: () => {
      const nextIndex = (focused + 1) % projects.length;
      setFocusedIndex(nextIndex);
      navigate(`#${projects[nextIndex].node.id}`, { replace: true });
    },
    prev: () => {
      const prevIndex = (focused - 1 + projects.length) % projects.length;
      setFocusedIndex(prevIndex);
      navigate(`#${projects[prevIndex].node.id}`, { replace: true });
    },
  };
};

const FancyProjectView = ({ projects, location }) => {
  const { focused, setFocused, next, prev } = useProjects(projects, location);
  const project = isDefined(focused) ? projects[focused].node : undefined;

  const isInternalLink =
    project && project.links.live && project.links.live[0] === '/';
  const preloadGif = usePreloadImage(
    project && project.image && project.image.publicURL
  );

  return (
    <>
      <ul className="ProjectPage--project-grid-container">
        {projects.map(({ node }, index) => (
          <FancyProjectCard
            project={node}
            location={location}
            active={focused === index}
            onActivate={() => setFocused(index)}
            onDismiss={() => setFocused(undefined)}
            next={next}
            prev={prev}
            key={node.id}
          />
        ))}
      </ul>
      <Dialog
        isOpen={!!project}
        onDismiss={() => setFocused(undefined)}
        large={!!(project && (project.staticImage || project.image))}
        aria-label={`Details for ${project ? project.name : 'project'}`}
        heading={project && project.name}
        onKeyDown={(ev) => {
          if (ev.key === 'ArrowLeft') {
            prev();
          }
          if (ev.key === 'ArrowRight') {
            next();
          }
        }}
      >
        {project && (
          <>
            <div className={styles.details}>
              <div
                className={`content-section ${styles.content}`}
                id={project.id}
              >
                <p className="mb-2">{project.description}</p>
                <Ul className="mb-3">
                  {project.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </Ul>
                <div className="-mx-2 my-4">
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
                {project.image &&
                  (project.staticImage ? (
                    <GifPlayer
                      gif={project.image.publicURL}
                      still={project.staticImage.publicURL}
                      alt={`Demo of ${project.name}`}
                      onFocus={preloadGif}
                      onMouseEnter={preloadGif}
                      className={styles.image}
                      containerClassName={styles.imageWrapper}
                      key={project.id}
                    />
                  ) : (
                    <div className={styles.imageWrapper}>
                      <img
                        src={project.image.publicURL}
                        className={styles.image}
                        alt={`Demo of ${project.name}`}
                        key={project.id}
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex justify-between">
              <Button onClick={prev} className="text-lg" color="link">
                Prev
              </Button>
              <Button onClick={next} className="text-lg" color="link">
                Next
              </Button>
            </div>
          </>
        )}
      </Dialog>
    </>
  );
};

const ProjectPage = ({ data: { allProjects }, location }) => {
  const isRendered = useIsJsEnabled();

  return (
    <div className="ProjectPage">
      <Seo title="Past Projects" />
      <MainContent as="div">
        <main>
          <div className="text-center my-6">
            <h1 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
              Sample Projects
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
              Sample projects that I've worked on.
            </p>
          </div>
          <div className="py-6 px-4">
            {isRendered ? (
              <FancyProjectView
                projects={allProjects.edges}
                location={location}
              />
            ) : (
              <ProjectListView projects={allProjects.edges} />
            )}
          </div>
        </main>
        <nav className="text-center my-4 py-2">
          <RoundedLinkButton to="/">Home</RoundedLinkButton>
        </nav>
      </MainContent>
    </div>
  );
};

export const query = graphql`
  query ProjectsPageQuery {
    allProjects: allProjectsYaml {
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
          staticImage {
            publicURL
          }
        }
      }
    }
  }
`;

export default ProjectPage;
