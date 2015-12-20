var Root = {
Barcode_No: "",
Category: "",
DET_STOCK_QTY: "",
Default_Size_val: "",
MRP_val: "",
Pcs_Length_val: "",
Product_Type: "",
Qty_In_Stock_val: "",
QualityNo: null,
Sales_Tax: "",
Size_val: "",
Tax_val: "",
UOM: ""
};

angular.module('app.purchase',[])
.controller("PurchaseController", ['API','$http','$compile', function (API,$http,$compile) {
   
  var HttpUrl = "Qry/q.php";
 

  var vm = this;
  vm.model ="";
  vm.isDeveloperMode = true;
	if(window.location.toString().indexOf("file:") != -1)
	{
		vm.isDeveloperMode  = true;
	}
    vm.Page = "Details";
    if (vm.City == undefined && vm.Category == undefined){
        vm.City = "Mumbra";
        vm.Category = "Classes";
    }
    vm.webdata = "";
    vm.webHtml = "nasir";
    //vm.id = params['id'];
	  vm.BarcodeList = {};
    vm.Barcode_No_Look = window.localStorage.getItem("Barcode_No");
    var LoadData = window.localStorage.getItem("BarcodeList");
    if (LoadData != null){
	 	vm.BarcodeList = JSON.parse(LoadData);
		  console.log(vm.BarcodeList);
 	  }
    vm.model = Root;
    	
    vm.tempModel = {};
    vm.bind = function(){
        $("[contenteditable=true]").removeAttr("contenteditable");

    }

    vm.NewBarcode = function(){
		vm.model = Root;
		vm.model.Barcode_No = "";
	}

  vm.openDiv = function()
  {
    vm.displayStyle = 'block';
    console.log('hello');
  }

  vm.selected = function(v)
  {
    vm.tempModel.Party_Name = v;
     vm.displayStyle = 'none';
  }

  vm.doCalculation = function()
  {
        var qty = vm.tempModel.Qty_val;
        var cost_price = vm.tempModel.Cost_Price_val;
        vm.tempModel.T_Amount_val = '';
      console.log(qty);
      console.log(cost_price);
      if(( qty != undefined || qty != '') && ( cost_price != undefined || cost_price != ''))
      {
        vm.tempModel.T_Amount_val = qty * cost_price; 
      }

  }

	vm.SavePurchase = function(){
		console.log(HttpUrl);
    console.log(vm.model);
  $.post(HttpUrl,{qry:vm.model,action:"SavePurchase"},function(data){
      console.log(data);
      toastr.success( data, "Status");
      setTimeout(function() { init(); }, 500);
    })
	}

	vm.SavePurchaseDet = function(){
		vm.tempModel.Barcode_No = vm.model.Barcode_No;
		console.log(vm.tempModel);
    $.post(HttpUrl,{qry:vm.tempModel,action:"SavePurchaseDet"},function(data){
      console.log(data);
      toastr.success( data, "Status");
		  
      vm.SearchBarcode(vm.model.Barcode_No);
         setTimeout(function() { init(); }, 500);
        })
	}

	vm.DeletePurchase = function(Barcode_No){
		if (confirm("Are you sure want to delete Barcode No: " + Barcode_No)){
			$.post(HttpUrl,{qry:Barcode_No,action:"DeletePurchase"},function(data){
         		console.log(data);
          		toastr.success( data, "Status");
	         	setTimeout(function() { init(); }, 500);	 
        	})
        	vm.NewBarcode();
		}
	}

	vm.DeletePurchaseDet = function(id){
		if (confirm("Are you sure want to delete id: " + id)){
			$.post(HttpUrl,{qry:id,action:"DeletePurchaseDet"},function(data){
         	   console.log(data);
	          toastr.success( data, "Status");
	         setTimeout(function() { init(); }, 500);
        	})
		}
	}

	vm.EditPurchaseDet = function(id){
    vm.tempModel = angular.copy(vm.model.det[id]);
		console.log(vm.tempModel);
			}
			vm.AddPurchaseDet = function(){
				vm.tempModel = {};
        
				//vm.tempModel.Bill_Date = new Date();

        vm.tempModel.Size = vm.model.Size_val;
        vm.getPartyname();
	}

  vm.changeProductType = function(){
    console.log('Hello');
      if(vm.model.Product_Type == 'Apparel Shirt')
      {
            vm.model.UOM = 'Pcs';
            vm.model.Sales_Tax = 'Applicable';
            vm.model.Default_Size_val = 1;     
            vm.model.Tax_val = 5;
      }
      else if (vm.model.Product_Type == 'Suiting')
      {
            vm.model.UOM = 'Meter';
            vm.model.Sales_Tax = 'Not Applicable';
            vm.model.Default_Size_val = 1.2;
            vm.model.Tax_val = 0;
      }
      else
      {
            vm.model.UOM = '';
            vm.model.Sales_Tax = '';
            vm.model.Default_Size_val = ''; 
            vm.model.Tax_val = 0;
      }
  }

	vm.LoadBarcodeInformation = function(model){

      vm.model = angular.copy(model.main[0]);
	    vm.model.det = angular.copy(model.det);
      console.log(vm.model);
	}
			
	vm.SimilarBarcode = function(Barcode_No_Look){
      HttpQry = "action=SearchBarcode&qry=" + Barcode_No_Look;
	    localStorage.setItem('Barcode_No', Barcode_No_Look);
      console.log(HttpQry);
      API.call().then(function (response) {

                   try{
                            console.log("----APICALL Details Json Data----");
					       console.log(response);
                  WebData = response;
                            vm.BarcodeList =  WebData;
							localStorage.setItem('BarcodeList', JSON.stringify(vm.BarcodeList));
                            //  console.log(vm.model);
                            toastr.success(vm.model.Barcode_No, "Status");

                       }catch(e){
                           console.log(e);
                                        toastr.error("error", "Status");
                       }
                    setTimeout(function() { init(); }, 500);
                });
	}

	vm.SearchBarcode = function(Barcode_No_Look){
		console.log($scope);
		localStorage.setItem('Barcode_No', Barcode_No_Look);
	     HttpQry = "action=GetBarcode&qry=cols Barcode_No = '" + Barcode_No_Look +"'";
         API.call().then(function (response) {

                    try{
                             console.log("----APICALL Details Json Data----");
						     WebData = response;
                             vm.model =  WebData.main[0];
                             vm.model.det =  WebData.det;
                             console.log(vm.model);
                             toastr.success( vm.model.Barcode_No, "Status");

                        }catch(e){
                            console.log(e);
                            toastr.error("error", "Status");
                        }
                     setTimeout(function() { init(); }, 500);
                 });
		
		
	}

  vm.getPartyname=function(){
      HttpQry = "action=getPartyname";
         API.call().then(function (response) {

                    try{
                             console.log("----APICALL Details Json Data----");
                             vm.partyNames =response;
                             console.log(response);
                             

                        }catch(e){
                            console.log(e);
                            toastr.error("error", "Status");
                        }
                     setTimeout(function() { init(); }, 500);
                 });

}
   


   vm.open = function(city,category){
       vm.City = city;
       vm.Category =  category;
        if (vm.id == undefined){
           HttpQry = "action=web&qry=cols  categoy = '"+city + "|" + category+"'";

      }
      else
      {

      }
        var WebData = "";

          HttpQry = "qry=select layout from template where category = '"+city + "|" + category+"' and layout != '' order by datetime desc limit 1";
          console.log(HttpQry);
          API.call().then(function (response) {

              if (response != null){
              try{

                      console.log("----Layout HTML----");
                      console.log(response);
                      if (response[0].layout == "") return;
                      var html = response[0].layout;
                      var tElement = $("#baseid");
                      var el = angular.element(html);
                      tElement.append(el);
                      compiled = $compile(el);
             //           $(".dn").remove();
                    HttpQry = "action=web&qry=cols id_web = "+vm.id;
                     API.call().then(function (response) {

                                try{
                                         console.log("----APICALL Details Json Data----");
                                         WebData = response;
                                         vm.model =  WebData;
										 
                                         console.log(vm.webdata);
                                         toastr.success( response.length, "Status");

                                    }catch(e){
                                        console.log(e);
                                                     toastr.error("error", "Status");
                                    }
                                 setTimeout(function() { init(); }, 500);
                             });


                      compiled($scope);
                      vm.$digest();
                      vm.bind();

                  }catch(e){
                      console.log(e);
                       toastr.error(e, "Status");
                  }
                  setTimeout(function() { init(); }, 500);
         }
        });

    }
   // vm.open(vm.City,vm.Category);
   if (vm.Barcode_No == "") {
	   vm.NewBarcode();
	
   }
   else
   {
	   vm.model.Barcode_No = vm.Barcode_No;
	 //  vm.SimilarBarcode();
	
   }

}]);

