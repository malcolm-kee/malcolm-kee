/**
 * Note that you can't copy paste the whole file because there are many duplicate
 * variable declaration. Copy paste the specific section for the question and try
 * it out.
 *
 * If there is any question, raise an issue to this repo!
 */

// Array destructuring exercise 1
function logTodosPlan(activities) {
  var [firstActivity, secondActivity, thirdActivity, ...doLaters] = activities;
  console.log('I will start my day with ' + firstActivity);
  console.log('Then I will ' + secondActivity);
  console.log('Finally, I ' + thirdActivity);
  console.log('Activities that I will do later are: ' + doLaters.join(', '));
}

// Array destructuring exercise 2
function announceParticipants(event, participants) {
  var [
    [firstTeacher = 'N/A', secondTeacher = 'N/A'],
    [firstStudent = 'N/A', secondStudent = 'N/A'] = [],
  ] = participants;

  console.log('Announcing participants for ' + event);
  console.log(
    'The first two teachers are: ' + firstTeacher + ' and ' + secondTeacher
  );
  console.log(
    'The first two students are: ' + firstStudent + ' and ' + secondStudent
  );
}

// Object destructuring exercise 1
function logPerson(person) {
  var {
    name: { firstName, lastName },
    age,
  } = person;

  console.log(firstName + ' ' + lastName + ', aged ' + age);
}

// Object destructuring exercise 2
function getStyles(styles) {
  var { display = 'block', dimensions: { width = '100%' } = {} } = styles || {};

  return {
    display,
    width,
  };
}

// destructuring in function parameters exercise
function formatNumber(number, { prefix = 'RM ', suffix = '.00' } = {}) {
  return prefix + number + suffix;
}
