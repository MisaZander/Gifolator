var Gifolator = {
    apikey: "cQ5mbtTfzO9Qc6BwVOxVldTQvzb97yGF",
    tags: ["cats", "dogs", "food", "reaction", "memes"],
    offset: 0,
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

        $(".gif-button").on("click", function() {
            $(".gif-button").attr("class", "btn btn-primary gif-button");
            $(this).attr("class", "btn btn-success gif-button");
            Gifolator.getIt($(this).data("tag"));
        });
    }, //loadTags()
    getIt: function(tag) {
        $("#images").empty();
        let newTag = tag.replace(" ", "+");
        let offset = this.obtainOffset() * 10;
        let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + this.apikey + "&q=" + newTag + "&limit=10&offset=" + offset;
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

            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");
                console.log(state);
                if(state === "still") {
                    var data = $(this).data("animate");
                    $(this).attr("src", data);
                    $(this).attr("data-state", "animate");
                  } else if (state === "animate") {
                    var data = $(this).data("still");
                    $(this).attr("src", data);
                    $(this).attr("data-state", "still");
                  }
            }); 
        }); //ajax then
    }, //getIt()
    obtainOffset: function() {
        offset = this.offset;
        this.offset++;
        return offset;
    }
}; //gifolator object

Gifolator.init();
$("#submitTag").on("click", function(event) {
    event.preventDefault();
    let tag = $("#addTag").val();
    $("#addTag").val("");
    Gifolator.tags.push(tag);
    Gifolator.loadTags();
});