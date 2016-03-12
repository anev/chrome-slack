var DEFAULT_SETTINGS = {
  slackToken: 'test_token',
  channel: 'random'
};

function send(slackToken, channel, info) {

  var text = info.pageUrl + " \n ```\n" + info.selectionText + "\n```";

  var url = "https://slack.com/api/chat.postMessage"
  + "?token=" + slackToken
  + "&channel=" + '%23'+channel
  + "&text=" + text
  + "&username=Chrome"
  + "&icon_emoji=:computer:"
  + "&pretty=1"

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send();
  var result = JSON.parse(xhr.responseText);

  if(result.ok == true){
    alert("Sent!");
  } else {
    alert("An error occured...");
  }
}

function onClick(info, tab) {

  if(typeof info.selectionText != 'undefined') {

    chrome.storage.sync.get(DEFAULT_SETTINGS, function(items){
      send(items.slackToken, items.channel, info);
    });
  }
}

var id = chrome.contextMenus.create({
  "title": "Send to slack",
  "contexts":["selection"],
  "onclick": onClick
});
