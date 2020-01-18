const onCompleted = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([{ id }]) => {
    chrome.pageAction.show(id);
  });
}

const onCompletedOptions: chrome.webNavigation.WebNavigationEventFilter = {
  url: [
    { urlMatches: 'gitlab.com' }
  ]
};

const onInstalled = () => {
  chrome.webNavigation.onCompleted.addListener(
    onCompleted,
    onCompletedOptions
  );
};

chrome.runtime.onInstalled.addListener(onInstalled);
