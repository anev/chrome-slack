function save_options() {
  var slackToken = document.getElementById('slackToken').value;
  var channel = document.getElementById('channel').value;
  chrome.storage.sync.set({
    slackToken: slackToken,
    channel: channel
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    slackToken: '',
    channel: 'random'
  }, function(items) {
    document.getElementById('slackToken').value = items.slackToken;
    document.getElementById('channel').value = items.channel;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
