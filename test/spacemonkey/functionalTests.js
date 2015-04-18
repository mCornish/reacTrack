/*global monkey, test*/

// these tests assume you've loaded the default fixture
monkey.loadApp('/', {
    height: 500,
    width: 600,
    bugUrl: 'https://github.com/mCornish/reacTrack/issues/new'
});

test('QA Primary', function () {
    monkey
        .log('Starting')
        .waitForVisible('[data-hook="page-container"] .page')
        .confirm('The app loaded to the login page.')
        .confirm('I can log in with Facebook.')
        .confirm('I can log out.')
        .confirm('I can in with an email and password.')
        .waitForVisible('[data-hook="featured"]')
        .confirm('The app loaded to the home page.')
        .confirm('Featured gifts are visible.')
        .confirm('Most popular gifts are visible.')
        .instruct('A gift image will be clicked. Please ensure:', [
            'A gift detail page loads'
        ])
        .click('[data-hook="image"]')
        .waitForVisible('[data-hook="image"]')
        .confirm('Everything look ok?')
        .goToPage('/admin')
        .confirm('Admin page is visible')
        .destroy();
});
