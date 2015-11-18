var Root = {
	"Bill_No":"",
	"det":[]
};
function printContent(el){
	$("#myModalPrint").hide();
	var restorepage = document.body.innerHTML;
	var printcontent = document.getElementById(el).innerHTML;
	document.body.innerHTML = printcontent;
	window.print();
	document.body.innerHTML = restorepage;
}
var ChangeEvent = false;


angular.module('app.lock', [])
.controller("LockController", function () {
	HttpUrl = "Qry/billq.php";
    var vm = this;
	vm.UserName = "Bhupen";
    vm.name = "Nasir Sayed Twsting";
    	vm.PassWord = "123";
	vm.disabled = true;
	vm.Unlock = function(){
		if (vm.PassWord == vm.userpassword){
			vm.disabled = false;
		}
		else
		{
			vm.disabled = true;
		}
		
	}
	vm.SendContact = function(){
		HttpUrl = "Qry/q.php";
    
        $.post(HttpUrl,{qry:vm.model,action:"SendEnquiry"},function(data){
          toastr.success( data, "Status");

  			window.location = "Bill.html";
        });
	}
});

