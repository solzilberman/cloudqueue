module.exports = function(data) {
    Songs.push(data.body.tracks.items[0].name);
    prevUrl = data.body.tracks.items[0].preview_url;
    console.log(data.body.tracks.items[0].name);
    }, function(err) {
    console.error(err);
};