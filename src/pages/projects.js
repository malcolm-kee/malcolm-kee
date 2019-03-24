import { Link } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import krelosesMobileImg from '../assets/kreloses-mobile.gif';
import msiaEmploymentImg from '../assets/msia-employment.gif';
import realQuizApp from '../assets/real-quiz.gif';
import reduxCodeGenerator from '../assets/redux-code-generator.gif';
import simpleCartImg from '../assets/simple-cart.gif';
import vueAppImg from '../assets/vue-movie-app.gif';
import wizardFormImg from '../assets/wizard-form.gif';
import { Button } from '../components/Button';
import { Card, CardActions, CardContent, CardImage } from '../components/Card';
import { OutLink } from '../components/OutLink';
import './projects.scss';

const ProjectPage = () => (
  <div className="ProjectPage">
    <Helmet>
      <title>Past Projects</title>
    </Helmet>
    <div className="main-content">
      <main>
        <h1>Past Projects</h1>
        <div className="ProjectPage--project-container">
          <Card className="ProjectPage--project">
            <div>
              <CardContent>
                <h2>Redux Code Generator</h2>
                <dl>
                  <dt>description</dt>
                  <dd>
                    An application to generate redux code and unit tests based
                    on initial states.
                  </dd>
                  <dt>technology/library</dt>
                  <dd>
                    <ul>
                      <li>React</li>
                      <li>Redux</li>
                      <li>Typescript</li>
                      <li>Bootstrap</li>
                    </ul>
                  </dd>
                </dl>
              </CardContent>
              <CardActions className="ProjectPage--project-links">
                <Button
                  component={OutLink}
                  href="https://redux-code-generator.netlify.com/"
                  color="primary"
                  raised
                >
                  Demo
                </Button>
                <Button
                  component={OutLink}
                  href="https://github.com/malcolm-kee/redux-code-generator"
                  raised
                >
                  Code
                </Button>
              </CardActions>
            </div>
            <CardImage
              src={reduxCodeGenerator}
              alt="Demo of Redux Code Generator"
              className="ProjectPage--demo-image"
            />
          </Card>
          <Card className="ProjectPage--project">
            <div>
              <CardContent>
                <h2>Kreloses Mobile</h2>
                <dl>
                  <dt>description</dt>
                  <dd>
                    Business application for daily operations of service
                    business. UI and interactions are designed and optimized for
                    mobile browser.
                  </dd>
                  <dt>technology/library</dt>
                  <dd>
                    <ul>
                      <li>ReactJs</li>
                      <li>Redux</li>
                      <li>Redux Thunk</li>
                      <li>Redux Saga</li>
                      <li>Typescript</li>
                      <li>Jest</li>
                      <li>Webpack</li>
                      <li>Material-UI</li>
                      <li>React Bootstrap</li>
                      <li>SCSS</li>
                    </ul>
                  </dd>
                </dl>
              </CardContent>
              <CardActions>
                <Button
                  component={OutLink}
                  href="https://mobile.kreloses.com"
                  color="primary"
                  raised
                >
                  View (Login Required)
                </Button>
              </CardActions>
            </div>
            <CardImage
              src={krelosesMobileImg}
              alt="Demo of Kreloses Mobile"
              className="ProjectPage--demo-image"
            />
          </Card>
          <Card className="ProjectPage--project">
            <div>
              <CardContent>
                <h2>Real Quiz</h2>
                <dl>
                  <dt>description</dt>
                  <dd>
                    A polling application that allow instructors to give polling
                    and get real-time polling results.
                  </dd>
                  <dt>technology/library</dt>
                  <dd>
                    <ul>
                      <li>Angular</li>
                      <li>Angular Material</li>
                      <li>Firebase (Firestore & Auth)</li>
                      <li>RxJS</li>
                      <li>Typescript</li>
                    </ul>
                  </dd>
                </dl>
              </CardContent>
              <CardActions>
                <Button
                  component={OutLink}
                  href="https://real-quiz-app.firebaseapp.com"
                  color="primary"
                  raised
                >
                  Demo
                </Button>
              </CardActions>
            </div>
            <CardImage
              src={realQuizApp}
              alt="Demo of Real Quiz"
              className="ProjectPage--demo-image"
            />
          </Card>
          <Card className="ProjectPage--project">
            <div>
              <CardContent>
                <h2>Shopping Cart</h2>
                <dl>
                  <dt>description</dt>
                  <dd>
                    A simple shopping cart that demonstrates client side
                    calculation for complex discount rules. <br />
                    The site implements material design without third-party
                    library.
                  </dd>
                  <dt>technology/library (frontend)</dt>
                  <dd>
                    <ul>
                      <li>ReactJs</li>
                      <li>Redux</li>
                      <li>Redux Thunk</li>
                      <li>Typescript</li>
                      <li>Jest</li>
                      <li>Webpack</li>
                      <li>SCSS</li>
                    </ul>
                  </dd>
                  <dt>technology/library (backend)</dt>
                  <dd>
                    <ul>
                      <li>NodeJs</li>
                      <li>ExpressJs</li>
                      <li>Mongoose</li>
                      <li>MongoDB</li>
                    </ul>
                  </dd>
                </dl>
              </CardContent>
              <CardActions>
                <Button
                  component={OutLink}
                  href="https://seek-shopping-cart.netlify.com/"
                  color="primary"
                  raised
                >
                  Demo
                </Button>
              </CardActions>
            </div>
            <CardImage
              src={simpleCartImg}
              alt="Demo of Shopping Cart"
              className="ProjectPage--demo-image"
            />
          </Card>
          <Card className="ProjectPage--project">
            <div>
              <CardContent>
                <h2>Wizard Form</h2>
                <dl>
                  <dt>description</dt>
                  <dd>
                    A step-by-step form that used advanced React Patterns, e.g.
                    Compound Component and Higher-order Components.
                  </dd>
                  <dt>technology/library</dt>
                  <dd>
                    <ul>
                      <li>ReactJs</li>
                      <li>Jest</li>
                      <li>Webpack</li>
                      <li>SCSS</li>
                    </ul>
                  </dd>
                </dl>
              </CardContent>
              <CardActions className="ProjectPage--project-links">
                <Button
                  component={OutLink}
                  href="https://wizard-form.netlify.com"
                  color="primary"
                  raised
                >
                  Demo
                </Button>
                <Button
                  component={OutLink}
                  href="https://bitbucket.org/malcolmkee/wizard-form"
                  raised
                >
                  Code
                </Button>
              </CardActions>
            </div>
            <CardImage
              src={wizardFormImg}
              alt="Demo of Wizard Form"
              className="ProjectPage--demo-image"
            />
          </Card>
          <Card className="ProjectPage--project">
            <div>
              <CardContent>
                <h2>Vue Movie App</h2>
                <dl>
                  <dt>description</dt>
                  <dd>
                    A site to view popular movies. <br />
                    The data is retrieved from{' '}
                    <OutLink href="https://www.themoviedb.org/">TMDb</OutLink>.
                  </dd>
                  <dt>technology/library</dt>
                  <dd>
                    <ul>
                      <li>Vue</li>
                      <li>Vuex</li>
                      <li>Vue CLI</li>
                    </ul>
                  </dd>
                </dl>
              </CardContent>
              <CardActions className="ProjectPage--project-links">
                <Button
                  component={OutLink}
                  href="https://vue-movie-app.netlify.com"
                  color="primary"
                  raised
                >
                  Demo
                </Button>
                <Button
                  component={OutLink}
                  href="https://github.com/malcolm-kee/vue-movie-app"
                  raised
                >
                  Code
                </Button>
              </CardActions>
            </div>
            <CardImage
              src={vueAppImg}
              alt="Demo of Vue Movie App"
              className="ProjectPage--demo-image"
            />
          </Card>
          <Card className="ProjectPage--project">
            <div>
              <CardContent>
                <h2>Malaysia Employment Data Visualization</h2>
                <dl>
                  <dt>description</dt>
                  <dd>
                    Data visualization based on employment data from{' '}
                    <OutLink href="https://www.dosm.gov.my/v1/index.php?r=column3/accordion&menu_id=aHhRYUpWS3B4VXlYaVBOeUF0WFpWUT09">
                      Department of Statistics Malaysia
                    </OutLink>.
                  </dd>
                  <dt>technology/library</dt>
                  <dd>
                    <ul>
                      <li>D3.js</li>
                      <li>React</li>
                      <li>Webpack</li>
                    </ul>
                  </dd>
                </dl>
              </CardContent>
              <CardActions className="ProjectPage--project-links">
                <Button
                  component={OutLink}
                  href="https://msia-employment.netlify.com/"
                  color="primary"
                  raised
                >
                  Demo
                </Button>
                <Button
                  component={OutLink}
                  href="https://github.com/malcolm-kee/msia-employment"
                  raised
                >
                  Code
                </Button>
              </CardActions>
            </div>
            <CardImage
              src={msiaEmploymentImg}
              alt="Demo of Malaysia Employment Data Visualization"
              className="ProjectPage--demo-image"
            />
          </Card>
        </div>
      </main>
      <nav className="Toolbar center">
        <Link to="/" className="link-primary">
          Home
        </Link>
      </nav>
    </div>
  </div>
);

export default ProjectPage;
