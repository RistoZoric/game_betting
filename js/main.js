window.onload = function () {

  var result = [0, 0, 0];
  var card_array = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  var card_number = 3;
  var card_width = 170;
  var card_height = 170;
  var current_array = [[0, 2, 1], [3, 4, 3], [6, 8, 6]];
  var global_i=0;
  var appearCardSetInterval=null
  //Game object
  var Game = new Game({ result });
  Game.loadImage();
  Game.initial();

  function Game({ result }) {
    this.loadImage=function(){
      var image=new Array();
      for(var i=0;i<54;i++){
        console.log(i);
        image[i]=new Image();
        image[i].src="./sprites/silver_scratch/silver_scratch_"+i+".png";
      }
      console.log(image);
    }
    this.initial = function () {
      cardInitial();
      controlpanelInitial();
    }

  }

  function cardInitial() {
    $(".betting_card").html("");
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        $(".betting_card").append("<div id='card-" + i + "-" + j + "' class='card' style='top: " + i * card_height + "px; left: " + j * card_width + "px'><img src='./sprites/silver_scratch/silver_scratch_0.png' class='full'></div>")
      }
    }
  }

  function controlpanelInitial() {
    $('.start_panel').append("<p class='text-position'>QUICK<br>SCRATCH</p>")
    $('.winning_panel').append("<div class='text-position'><p>WINNINGS</p><p>$<span id='winning'>0.00</span></p></div>")
    $('.card_panel').append("<div class='text-position'><p>CARDS</p><p>2/<span id='card'>3</span></p></div>")
  }

  $(".card").click(function () {
    console.log(appearCardSetInterval);
    var id = $(this).attr('id');
    if (id.split("-").length == 3 && appearCardSetInterval==null) {
      $(this).attr('id', id + '-1')
      var i = id.split("-")[1];
      var j = id.split("-")[2];
      appearCard(this, current_array[i][j]);
    }
  })

  async function appearCard(obj, src) {

    var path = "./sprites/symbol_" + src + "/symbol_" + src + "_0.png";
    $(obj.firstChild).attr('src', path);
    $(obj).append("<img class='background_card' src='./sprites/win_frame_anim/win_frame_anim_0.png' />")
    $(obj).append("<img class='background_card_effect' id='effect' src='./sprites/silver_scratch/silver_scratch_0.png'>")
  
    appearCardSetInterval=await setInterval(appearCardEffect, 30, obj)
  }
  function appearCardEffect(obj) {
    global_i++;
    var src = "./sprites/silver_scratch/silver_scratch_" + global_i + ".png";
    
    $(obj.lastChild).attr('src', src)
    if(global_i==53){
      global_i=0;
      clearInterval(appearCardSetInterval)
      appearCardSetInterval=null
    }
  }
}

