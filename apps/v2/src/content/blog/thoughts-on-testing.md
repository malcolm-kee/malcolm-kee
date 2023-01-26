---
title: 'Thoughts on Testing'
pubDate: 15 Apr 2019
description: 'A list of unorganized random thoughts on automated testing'
---

1.  Automated test are just code with different purposes. Therefore, many principles of coding, e.g. DRY and abstraction, still applies. However, you may overdo DRY and abstraction for test, just like how it could happens when you write code.

1.  It is helpful to think in advance how granular the "unit" of your "unit test". Is it a function, a javascript file (module), or a list of files that are tightly coupled with each other? Once you have decided the "unit", you should test it as a black box, i.e. verifying the output given a specific input, without checking the implementation/ how the subunit within the unit interact with each other.

1.  Why test it as a black box? Because when you're testing your code as a black box, it's more likely you're testing the purpose of the code, instead of how the code achieve that.

1.  What does "testing it as a black box" supposed to mean? Let's see an example:

    ```js
    import _ from 'lodash';

    export function mapData(serverData) {
      return serverData.map((itemData) => _.pick(itemData, ['id']));
    }
    ```

    Following are the tests that test it as a black-box and as a white-box. (The tests assume [Jest] as the test framework.)

    ```js
    import _ from 'lodash';
    import { mapData } from './map-data';

    const serverData = [
      { id: 1, name: 'Malcolm Kee', age: 26 },
      { id: 2, name: 'Michael Jordan', age: 50 },
    ];

    test('it as a black box', () => {
      expect(mapData(serverData)).toEqual([{ id: 1 }, { id: 2 }]);
    });

    test('it as a white box', () => {
      const spy = jest.spyOn(_, 'pick').mockImplementation(() => 'pickReturn');

      const result = mapData(serverData);

      expect(result).toEqual(['pickReturn', 'pickReturn']);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith(serverData[0], ['id']);
      expect(spy).toHaveBeenCalledWith(serverData[1], ['id']);

      spy.mockRestore();
    });
    ```

1.  You may realize writing unit tests that treat the code as a white-box are actually writing your code twice. Why is it bad? Because it does nothing other than stating your code did run in the way you understand the way it is, which is not really useful (except if you're just learning Javascript). In the meantime, every time you change your code, you need to change the tests, even though the behavior of the code has not changed.

1.  A bigger problem of the white-box testing above is that, it mocks the behavior of `lodash.pick`. The argument to mock it is that, it's the responsibility of `lodash.pick` to work as it document, so we should not test it and should mock it out instead.

1.  But the problem of that is, what if the documentation is wrong? What if the developer misinterpret the documentation? What if lodash make some breaking change? There are many possible failures here, but once you mock it out, you can't prevent those anymore; your tests would still pass even though it will breaks in actual application. I'm taking `lodash` as an example here, but that could be another files of your project, mocking it out has the exact same problem.

    > By mocking out dependencies of a unit and test it as independently, you are assuming that how those units interact with each other will not cause bug, which is a big assumption to make.

1.  And that's why some developers hate automated testing. The tests are just writing their code twice without catching any bug. The root cause of that is that they test the code as a white-box, thus causing those issue.

1.  Am I saying that mock doesn't have a place in testing? No. Mocking are justified for the following reasons:

    - the code is indeterministic (e.g. producing random result, making AJAX calls)
    - it is too expensive to run (charging to Credit Card)

    For those cases, by all means mock those out. What I am against is mocking just for the sake of making the test independent and fit the name of "unit testing".

1.  Be aware that the "output" of a code doesn't always means the return value of function only. This is because a lot code actually do some side-effects, e.g. append some DOM, add some event listener, making ajax call. For those cases, you may need to write extra code to verify the result. If you're writing test for React application, [react-testing-library] is your friend to do those verification.

1.  Does this means that we should always test our code at the highest level? E.g. for a React application, we should test the whole app? Ideally yes, but that would be impractical. For me, for a React-Redux application, I would usually test the success scenario (sunny-day scenario) for the whole app. I will then test the exception/edge case on the connected component.

[jest]: https://jestjs.io/
[react-testing-library]: https://testing-library.com/react
