var Root = {
	"Bill_No":"",
	"det":[],
	"GiftVouchers":[]
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

angular.module('app', [])
.controller("BillingController", ['API','$http','$compile','$location','$anchorScroll', function (API,$http,$compile,$location,$anchorScroll) {
	HttpUrl = "Qry/billq.php";
    var vm = this;
	vm.isDeveloperMode = false;
	if(window.location.toString().indexOf("file:") != -1)
	{
		vm.isDeveloperMode  = true;
	}
    vm.Page = "Details";
    vm.webdata = "";
	
    vm.OpenAllPanel = true;
	vm.btnDisOn = false;
	vm.btnCustOn = true;
	vm.btnCCOn = true;
	vm.btnFOCOn = true;
	vm.id = params['id'];
	vm.BillList = {};
	 
	vm.Bill_No_Look = window.localStorage.getItem("Bill_No");
	
	var LoadData = window.localStorage.getItem("BillList");
	if (LoadData != null){
		 try{
	 		vm.BillList = JSON.parse(LoadData);
		 }catch(E){ c
		 	onsole.log("error in BillList storage")}
		 	console.log(vm.BillList);
 	}
	vm.model = Root;
    	
	vm.tempModel = {};
	//vm.model.GiftVouchers = {};

	var LoadData = window.localStorage.getItem("BarcodeModel");
	
	if (LoadData != null){
		try{
			if (LoadData.indexOf("No data found") != -1 || LoadData.indexOf("-error-") != -1){
				vm.tempModel ={};
			}
			else{
				vm.tempModel = JSON.parse(LoadData);
			}
		}catch(E){ 
			console.log("error in BillList storage")}
		 	console.log(vm.tempModel);
 	}

	vm.StartCalculation = false;
	
	vm.takehim = function(TakeHimTo){
		setTimeout(function(){
			$location.hash(TakeHimTo);
			$anchorScroll();
		},500);
	}
	
	vm.SearchBar = function(SearchTerm){

		vm.Bill_No = SearchTerm;
		SearchList(SearchTerm);
		
	}
	
	vm.DoCalculation = function(){
		vm.StartCalculation = true;

		console.log(vm.StartCalculation);

		var c = vm.model;
		var totalMRP;
		var discountVal;
		
		c.Total_Amt_val = 0;
		for(var i = 0; i <= c.det.length -1 ;i++){
			if (c.det[i].remove == 0){
				totalMRP = c.det[i].MRP_val * c.det[i].Qty_val; 

				if(c.det[i].Disc_per_item != 0 || c.det[i].Disc_per_item != undefined)
				{
					discountVal = (totalMRP * c.det[i].Disc_per_item)/10;
					totalMRP = totalMRP - discountVal;
				}
				c.Total_Amt_val += totalMRP;
			}
			
		}
		c.Gift_Voucher_Amount = 0;
		for(var i = 0; i <= c.GiftVouchers.length -1 ;i++){
			//if (c.det[i].remove == 0){
				console.log('Gift_Voucher');
				console.log(c.GiftVouchers[i].Total_Amount);
				console.log(c.Gift_Voucher_Amount);
				c.Gift_Voucher_Amount = parseInt(c.Gift_Voucher_Amount) + parseInt(c.GiftVouchers[i].Total_Amount); 
			console.log(c.Gift_Voucher_Amount);
			//}
		}

		c.Discount_val = c.Total_Amt_val * c.Discount_per_val / 100;
		c.Discount_Coupon_Amount_val = c.Discount_Coupon_Total_Amount_val * c.Discount_Coupon_Percentage_val / 100;
	
		c.Balance_val = c.Total_Amt_val;
		c.Balance_val -= c.Total_advance_val;
		c.Balance_val -= c.Discount_val;
		c.Balance_val -= c.Discount_Coupon_Amount_val;
		c.Balance_val -= c.Credit_Card_Amount_val;
		c.Balance_val -= c.Cheque_Amount;
		c.Balance_val -= c.Coupon_Amt_val;
		c.Balance_val -= c.Gift_Voucher_Amount;
		c.Balance_val = Math.round(c.Balance_val);
		//vm.$apply();
	 	//console.log(vm.model.GiftVouchers.Total_Amount); 
	}
	
	vm.ExchangeSalesDet = function(modelDet){
		console.log(vm);
		 HttpQry = "action=ExchangeSalesDet&qry=" + modelDet.id_web;
         API.call().then(function (response) {

                    try{
						     console.log("----APICALL Details Json Data----");
						   	 
							 console.log("------response Start---------");
							 console.log(response);
							 console.log("------response End---------");
							 if (response.indexOf("No data found") != -1 || response.indexOf("-error-") != -1){
								 console.log("-------- LoadData.indexOf(No data found) ----")
								modelDet.remove = 1;
								 return;
							 }
						 	 modelDet.remove = 0;
							 vm.DoCalculation();
		
                        }catch(e){
                            console.log(e);
                            toastr.error("error " + e, "Status");
                            
                        }
                     
                 });
	}

	vm.DeleteSalesDet = function(modelDet){
		console.log(vm);
		HttpQry = "action=DeleteSalesDet&qry=" + modelDet.id_web;
        API.call().then(function (response) {
            try{
					console.log("----APICALL Details Json Data----");						   	 
					console.log("------response Start---------");
					console.log(response);
					console.log("------response End---------");
					if (response.indexOf("No data found") != -1 || response.indexOf("-error-") != -1){
						console.log("-------- LoadData.indexOf(No data found) ----")
						modelDet.remove = 0;
						return;
					}
					modelDet.remove = 1;
					vm.DoCalculation();
                }catch(e){
                    console.log(e);
                        toastr.error("error " + e, "Status"); 
                }     
        });
	}

	vm.SearchBarcode = function(BarcodeNo){
		 
		if (BarcodeNo == undefined) return;
		HttpQry = "action=SearchBarcode&qry=" + BarcodeNo;
        API.call().then(function (response) {
            try{
 				console.log("----APICALL Details Json Data----");			 
				console.log("------response Start---------");
				console.log(response);
				console.log("------response End---------");
				if (response.indexOf("No data found") != -1 || response.indexOf("-error-") != -1){
				console.log("-------- LoadData.indexOf(No data found) ----")
				vm.tempModel = {};
				return;
				}
 				vm.tempModel.Qty_val =  angular.copy(response[0].Default_Size_val);

 				vm.tempModel.MRP_val =  angular.copy(response[0].MRP_val);

 				vm.tempModel.SalesManCode =  angular.copy(response[0].SalesManCode);

 				vm.tempModel.Tax_per_val =  angular.copy(response[0].Tax_val);
							  
				vm.tempModel.UOM =   angular.copy(response[0].UOM);

 				vm.tempModel.Product_Type =  angular.copy(response[0].Product_Type);

 				vm.tempModel.category =  angular.copy(response[0].Category);
 						      			  
				vm.tempModel.Barcode_No =  angular.copy(response[0].Barcode_No);
							  
				vm.model.Qty_In_Stock_val =  angular.copy(response[0].Qty_In_Stock_val);

				vm.tempModel.remove =  0;
				
				vm.tempModel.Disc_per_item =  0;			
				
				console.log(vm.tempModel);
  				
  				localStorage.setItem('BarcodeModel', JSON.stringify(vm.tempModel));
        
                }catch(e){
                	console.log(e);
                    toastr.error("error " + e, "Status");          
                }  
        });
	 }

	vm.New = function(){	
	 	HttpQry = "action=NewSales";
        API.call().then(function (response) {
            try{
				console.log("----APICALL Details Json Data----");   	 
				console.log("------response Start---------");
				console.log(response);
				console.log("------response End---------");
				if (response.indexOf("-error-") != -1){
					console.log("-------- LoadData.indexOf(No data found) ----")
					return;
				}
				vm.model = Root;
				vm.model.Bill_No = response;
				//localStorage.setItem('Bill_No', vm.model.Bill_No);
				vm.Search(vm.model.Bill_No);
				vm.OpenAllPanel = true;
				vm.btnCCOn = true;
				vm.btnCustOn = true;
                }catch(e){
                	console.log(e);
                	toastr.error("error " + e, "Status");          
                }    
        });
        console.log('hello');
		
	}

	vm.addItem = function(){
		vm.tempModel.Bill_No = vm.model.Bill_No;
		console.log(vm.tempModel.id_web);
        console.log(vm.tempModel.Disc_per_item);
        /*var old_MRP_val = vm.tempModel.MRP_val;
        var totalMRP = vm.tempModel.MRP_val * vm.tempModel.Qty_val;
		if(vm.tempModel.Disc_per_item != 0 || vm.tempModel.Disc_per_item != '')
		{
			 
			var discountVal = ( totalMRP * vm.tempModel.Disc_per_item)/100;
			totalMRP = totalMRP - discountVal;	
		//	console.log(totalMRP);		
		}
		console.log(totalMRP);
		vm.tempModel.MRP_val = Math.round(totalMRP);*/

        $.post(HttpUrl,{qry:vm.tempModel,action:"SaveSalesDet"},function(data){
        	     console.log(data);
        	     console.log(data.indexOf("-Error-"));
		  	var NewItem = {};
		  	NewItem.Qty_val =  angular.copy(vm.tempModel.Qty_val);
	      	NewItem.MRP_val =  angular.copy(vm.tempModel.MRP_val);
	      	NewItem.SalesManCode =  angular.copy(vm.tempModel.SalesManCode);
	      	NewItem.Tax_per_val =  angular.copy(vm.tempModel.Tax_per_val);
		  	NewItem.UOM =   angular.copy(vm.tempModel.UOM);
	      	NewItem.Product_Type =  angular.copy(vm.tempModel.Product_Type);    	  
		  	NewItem.category = angular.copy(vm.tempModel.category);
		  	NewItem.Barcode_No =  angular.copy(vm.tempModel.Barcode_No);
		  	NewItem.Disc_per_item =  angular.copy(vm.tempModel.Disc_per_item);
	  		
	  		if(data.indexOf("-Error-") == -1)
	  		{
	  			NewItem.id_web =  parseInt(data);
	  			data = '-Success-';
	  		}

		  	NewItem.remove =  0;
		  	console.log('new');
		  	console.log(NewItem);
		  	if(vm.tempModel.id_web == undefined || vm.tempModel.id_web == '' )
		  	{
		  			vm.model.det.push(NewItem);
		  			console.log('u'+vm.model.det);	
		  	}
		  	else
		  	{
		  		for(var i = 0; i <= vm.model.det.length -1 ;i++){
					
					if(vm.model.det[i].id_web == vm.tempModel.id_web)
					{
						vm.model.det[i].Qty_val =  angular.copy(vm.tempModel.Qty_val);
	      				vm.model.det[i].MRP_val =  angular.copy(vm.tempModel.MRP_val);
	      				vm.model.det[i].SalesManCode =  angular.copy(vm.tempModel.SalesManCode);
	      				vm.model.det[i].Tax_per_val =  angular.copy(vm.tempModel.Tax_per_val);
	  	  				vm.model.det[i].UOM =   angular.copy(vm.tempModel.UOM);
	    				vm.model.det[i].Product_Type =  angular.copy(vm.tempModel.Product_Type);
    	  				vm.model.det[i].category = angular.copy(vm.tempModel.category);
		   				vm.model.det[i].Barcode_No =  angular.copy(vm.tempModel.Barcode_No);
		  				vm.model.det[i].Disc_per_item =  angular.copy(vm.tempModel.Disc_per_item);
					}
					//console.log(vm.model.det[1]);
				}
		  	}
		 	
		 	
		 	vm.DoCalculation();
		 	vm.$apply();
 	 	 	localStorage.setItem('BarcodeModel', JSON.stringify(NewItem));
		 	//console.log(vm.model.det);
		  	toastr.success( data, "Status");
	  	 	 vm.SearchBarcode(vm.model.Barcode_No);
         	setTimeout(function() { init(); }, 500);
        })
	}

	vm.editItem=function(item){
		console.log(item);
		vm.tempModel.Barcode_No = item.Barcode_No;
		vm.tempModel.Qty_val = item.Qty_val;
		vm.tempModel.MRP_val = item.MRP_val;
		vm.tempModel.Product_Type = item.Product_Type;
		vm.tempModel.category = item.category;
		vm.tempModel.UOM = item.UOM;
		vm.tempModel.SalesManCode = item.SalesManCode;
		vm.tempModel.Tax_per_val = item.Tax_per_val;
		vm.tempModel.Disc_per_item = item.Disc_per_item;
		vm.tempModel.id_web = item.id_web;		
	}

	vm.addGiftVoucher=function(){		
			console.log(vm.model.Gift);

			var Calc_Amount = vm.model.Gift.Gift_Voucher_Amount * vm.model.Gift.Gift_Voucher_No;
	        vm.model.Gift.Total_Amount = Calc_Amount;
	        vm.model.Gift.Bill_No = vm.model.Bill_No;
	        $.post(HttpUrl,{qry:vm.model.Gift,action:"Gift_Voucher"},function(data){
        	     console.log(data);
		  
        	var NewGiftVoucher = {};
			NewGiftVoucher.Gift_Voucher_Type =  angular.copy(vm.model.Gift.Gift_Voucher_Type);
			NewGiftVoucher.Gift_Voucher_Amount =  angular.copy(vm.model.Gift.Gift_Voucher_Amount);
			NewGiftVoucher.Gift_Voucher_No =  angular.copy(vm.model.Gift.Gift_Voucher_No);
			NewGiftVoucher.Total_Amount =  Calc_Amount;
			NewGiftVoucher.Gift_Voucher_ExpiryDate =  angular.copy(vm.model.Gift.Gift_Voucher_ExpiryDate);
		//	vm.model.GiftVouchers.push(angular.copy(NewGiftVoucher));
			

		  	if(vm.model.Gift.GV_id == undefined || vm.model.Gift.GV_id == '' )
		  	{
		  			vm.model.GiftVouchers.push(angular.copy(NewGiftVoucher));

		  	}
		  	else
		  	{
		  		for(var i = 0; i <= vm.model.GiftVouchers.length -1 ;i++){
					
					if(vm.model.GiftVouchers[i].GV_id == vm.model.Gift.GV_id)
					{
						
					}
					//console.log(vm.model.det[1]);
				}
		  	}
		 	
		 	
		 	vm.DoCalculation();
		 	vm.$apply();
 	 	 //	localStorage.setItem('BarcodeModel', JSON.stringify(NewItem));
		 	//console.log(vm.model.det);
		  	toastr.success( data, "Status");
	  	 	 //vm.SearchBarcode(vm.model.Barcode_No);
         	setTimeout(function() { init(); }, 500);
        })


	}


	vm.editGiftVoucher=function(v){
		console.log(v);	
			vm.model.Gift.Gift_Voucher_Type =  v.Gift_Voucher_Type;
			vm.model.Gift.Gift_Voucher_Amount =  v.Gift_Voucher_Amount;
			vm.model.Gift.Gift_Voucher_No =  v.Gift_Voucher_No;
			vm.model.Gift.Gift_Voucher_ExpiryDate =  v.Gift_Voucher_ExpiryDate;

	}

	vm.ExchangeSalesDetail =function(temp){

		$.post(HttpUrl,{qry:temp,action:"ExchangeSalesDetail"},function(data){
        	     console.log(data);

        	for(var i = 0; i <= vm.model.det.length -1 ;i++){
					
					if(vm.model.det[i].id_web == temp.id_web)
					{
						vm.model.det.splice(i,1);
						console.log(vm.model.det[i]);		
					}
					
				}	
			vm.DoCalculation();
		 	vm.$apply();     
		 	toastr.success( data, "Status");
		  })

	}

	vm.Save = function(){
		localStorage.setItem('Bill_No', vm.model.Bill_No);
		if (confirm("Are you sure want to Save Bill No: " + vm.model.Bill_No)){
		vm.model.saved = 1;
        $.post(HttpUrl,{qry:vm.model,action:"SaveSales_Book"},function(data){
         console.log(data);
          toastr.success( data, "Status");
         setTimeout(function() { init(); }, 500);
        })
    }
		
	}
	vm.SaveDet = function(){
		vm.tempModel.Barcode_No = vm.model.Barcode_No;
		console.log(vm.tempModel);
        $.post(HttpUrl,{qry:vm.tempModel,action:"XXXXXXX"},function(data){
         console.log(data);
          toastr.success( data, "Status");
		  vm.SearchBarcode(vm.model.Barcode_No);
         setTimeout(function() { init(); }, 500);
        })
	}
	vm.Delete = function(No){
		if (confirm("Are you sure want to delete Bill No: " + vm.model.Bill_No)){
			$.post(HttpUrl,{qry:vm.model.Bill_No,action:"DeleteSales"},function(data){
         		console.log(data);
          		toastr.success( data, "Status");
				vm.New();
	         	setTimeout(function() { init(); }, 500);
		 
        	})
        	vm.New();
		}
	 
	}
	vm.DeleteDet = function(id){
		if (confirm("Are you sure want to delete item: " + id)){
			$.post(HttpUrl,{qry:id,action:"DeleteDet"},function(data){
         	   console.log(data);
	          toastr.success( data, "Status");
	         setTimeout(function() { init(); }, 500);
        	})
		}
	}
	vm.EditDet = function(id){
		vm.tempModel = angular.copy(vm.model.det[id]);
		console.log(vm.tempModel);
			}
			vm.AddPurchaseDet = function(){
				vm.tempModel = {};
				//console.log(vm.tempModel);
				
			}

	vm.LoadInformation = function(model){
		
		vm.model = angular.copy(model.main[0]);
	    vm.model.det = angular.copy(model.det);
		console.log(vm.model);
	}
			
	vm.SearchList = function(No_Look){
		console.log(vm);
		 HttpQry = "action=SearchListBill&qry=" + No_Look;
         API.call().then(function (response) {

                    try{
						     console.log("----APICALL Details Json Data----");
						     WebData = response;
                             vm.BillList =  WebData;
                             console.log("BILLLIST DATA");
                             console.log(vm.BillList);
 							localStorage.setItem('BillList', JSON.stringify(vm.BillList));
        
                        }catch(e){
                            console.log(e);
                            toastr.error("error " + e, "Status");
                        }
                     
                 });
		
		
	}
	vm.Search  = function(No_Look){
		console.log(No_Look);
		if (No_Look == undefined) return;
		localStorage.setItem('Bill_No', No_Look);
	     HttpQry = "action=SearchBillNo&qry=Bill_No = " + No_Look;
         API.call().then(function (response) {

                    try{
						     console.log("----APICALL Details Json Data----");
						     WebData = response;
                             vm.model =  WebData[0];
                             vm.model.det =  WebData.det;
                             vm.model.GiftVouchers =  WebData.GiftVouchers;
						  console.log(vm.model);
						  	 vm.DoCalculation();	
                             toastr.success( vm.model.Barcode_No, "Status");

                        }catch(e){
                            console.log(e);
                            toastr.error("error", "Status");
                        }
                     setTimeout(function() { init(); }, 500);
                 });
		
		
	}
	if (vm.id == undefined) vm.id = "";

     // vm.open(vm.City,vm.Category);
   if (vm.id != "" ) {
	   	   vm.model.Bill_No = vm.id;
		   vm.Search(vm.model.Bill_No);
	
	   }
	   else if (vm.Bill_No_Look != ""  ){
		   vm.model.Bill_No = vm.Bill_No_Look;
		   if (vm.model.Bill_No){
		   		vm.Search(vm.model.Bill_No);
	   		}
			else{
		   		  vm.New();	
				
			}
	   }
	   else {
		   vm.New();
	   }
   

}]);

