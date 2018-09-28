var Gifolator = {
    apikey: "cQ5mbtTfzO9Qc6BwVOxVldTQvzb97yGF",
    tags: ["cats", "dogs", "food", "reaction", "memes"],
    init: function() {
        this.loadTags();
    },
    loadTags: function() {
        $("#tags").empty();
        for(let i = 0; i < this.tags.length; i++) {
            let button = $("<button>");
            $(button).attr("class", "btn btn-primary gif");
            $(button).attr("data-tag", this.tags[i]);
            $(button).text(this.tags[i]);
            $("#tags").append(button);
        }
    }, //loadTags()
    getIt: function(tag) {
        $("#images").empty();
        let newTag = tag.replace(" ", "+");
        let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + this.apikey + "&q=" + newTag + "&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            let image = $("<img>");
            image.attr("src", response.data[0].images.fixed_height_still.url);
            $("#images").prepend(image);
        });
    } //getIt()
}; //gifolator object

Gifolator.init();
Gifolator.getIt("reaction");