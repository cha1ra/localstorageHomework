




//キー入力をするとその値が返される
var $doc = $(document);
$doc.on('keydown', function(e){
    $('.test').html(e.which);
})