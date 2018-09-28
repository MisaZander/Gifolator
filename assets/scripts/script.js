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
            $(button).attr("class", "btn btn-primary gif-button");
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
            for(let i = 0; i < response.data.length; i++) {
                let image = $("<img>");
                $(image).attr("src", response.data[i].images.fixed_height_still.url);
                $(image).attr("alt", response.data[i].title);
                $(image).attr("data-still", response.data[i].images.fixed_height_still.url);
                $(image).attr("data-animate", response.data[i].images.fixed_height.url);
                $(image).attr("data-state", "still");
                $(image).attr("class", "gif");
                $("#images").prepend(image);
            }
        });
    } //getIt()
}; //gifolator object

Gifolator.init();
Gifolator.getIt("reaction");