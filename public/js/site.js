//Global defer function
function defer() {
    var res, rej;
  
    var promise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
  
    promise.resolve = res;
    promise.reject = rej;
  
    return promise
  
  }

  function postName(name) {
    $.ajax({
        url: '/change?name=' + name, 
        type: 'POST',
        contentType: false,
        data: false,
        processData: false,
        success: function(data){
            location.reload();
        }
    });
  }