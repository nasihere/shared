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
angular.module('app.reports', [])
.controller("ReportsController", ['API','$http', function (API,$http,$routeParams) {
    var vm = this;
 	var error= false;
 	vm.report = 'SalesDetails';
   	HttpQry = 'action=getAllReports';
	$("body").toggleClass("mini-navbar");   	
   	var reportsData =[];
    vm.moreoption=['1','2','3','4','5'];
    API.call().then(function (response) {
               try{
						console.log("----APICALL Details Json Data----"); 
						reportsData =  response; 
                        toastr.clear();
						toastr.success( "Report Ready", "Status");
						vm.startReport();

                   }catch(e){
                       console.log(e);
                       toastr.error("error", "Status");
                   }
         });
 
    vm.isDeveloperMode = false;
	if(window.location.toString().indexOf("file:") != -1)
	{
		vm.isDeveloperMode  = true;
	}
    vm.Page = "Details";
    vm.webdata = "";
	vm.model = "";
	//vm.heading = 'SalesDetails Report';
	vm.SetQuery = "Bill_No = -24897";
	vm.CurrentDate = new Date(); 
	vm.getDatetime = function() {
	  return (new Date).toLocaleFormat("%Y");
	};
	Array.prototype.sum = function (prop) {
	    var total = 0
	    for ( var i = 0, _len = this.length; i < _len; i++ ) {
			if (this[i][prop]){
	        	total += parseInt(this[i][prop])
			}
		}
	    return total;
	}
	vm.SetDate = function(Query){
		var q = "";
		var myTimeUnformatted = new Date();
		var DataFormat = "MM/dd/yyyy";
		var DateCols ="Date between '";
		if (Query == "Day"){
			var lastWeekUnformatted = new Date(new Date().setDate(new Date().getDate()));
			q =  0; //$filter('date')(lastWeekUnformatted, DataFormat) ;
		}
		else if (Query == "Yesterday"){
			var lastWeekUnformatted = new Date(new Date().setDate(new Date().getDate() - 1));
			q =  1;// $filter('date')(lastWeekUnformatted, DataFormat);
		}
		else if (Query == "Week"){
			var lastWeekUnformatted = new Date(new Date().setDate(new Date().getDate() - 7));
			q =  7;//$filter('date')(lastWeekUnformatted, DataFormat);
		}
		else if (Query == "Two Week"){
			var lastWeekUnformatted = new Date(new Date().setDate(new Date().getDate() - 14));
			q =  14;//$filter('date')(lastWeekUnformatted, DataFormat);
		}
		else if (Query == "Month"){
			var lastWeekUnformatted = new Date(new Date().setDate(new Date().getDate() - 31));
			q =  31;//$filter('date')(lastWeekUnformatted, DataFormat);
		}
		else if (Query == "Half Year"){
			var lastWeekUnformatted = new Date(new Date().setDate(new Date().getDate() - 182.5));
			q =  183;//$filter('date')(lastWeekUnformatted, DataFormat);
		}
		else if (Query == "Year"){
			var lastWeekUnformatted = new Date(new Date().setDate(new Date().getDate() - 365));
			q =  365;//$filter('date')(lastWeekUnformatted, DataFormat);
		}
		
		if (vm.report == "Item Sales Details" )
				{
					vm.SetQuery = "DATE_SUB(CURDATE(),INTERVAL " + q + " DAY) <= Date "
			   	 	HttpQry = "qry=SELECT Product_Type,Qty_val,MRP_val,Date,Sales_BookDet.Bill_No as Bill_No,sum(Sales_BookDet.Qty_val) as Qty,sum(Sales_Book.Total_TAX_NET_AMOUNT_val) as Tax,sum(Sales_Book. Total_TAX_AMOUNT_val) as Amount FROM Sales_BookDet,Sales_Book where Sales_BookDet.Bill_No = Sales_Book.Bill_No  and " +  vm.SetQuery + " order by Sales_Book.Bill_No";
			
				}
		
		else if (vm.report == "Summary Sales Details" )
		{
			vm.SetQuery = "DATE_SUB(CURDATE(),INTERVAL " + q + " DAY) <= Date "
	   	 	HttpQry = "qry=SELECT Product_Type,sum(Sales_BookDet.Qty_val) as Qty,sum(Sales_Book.Total_TAX_NET_AMOUNT_val) as Tax,sum(Sales_Book. Total_TAX_AMOUNT_val) as Amount FROM Sales_BookDet,Sales_Book where Sales_BookDet.Bill_No = Sales_Book.Bill_No  and " +  vm.SetQuery + " group by Product_Type";
			
		}
		else
		{
			vm.SetQuery = "DATE_SUB(CURDATE(),INTERVAL " + q + " DAY) <= Date;"
	   	 	HttpQry = "qry=select * from Sales_Book where " + vm.SetQuery;
			
		}
		vm.ShowReport();
	}

	vm.ShowSalesDetails = function(SetQuery){
   	 	HttpQry = "qry=select * from Sales_Book where " + SetQuery;
		vm.ShowReport();
	}
	
	vm.ShowItemSalesDetails = function(SetQuery){
   	 	HttpQry = "qry=select * from Sales_BookDet where " + SetQuery;
		vm.ShowReport();
	}

vm.startReport = function(){

	vm.Filters = JSON.parse(reportsData.SalesDetails.r_filters);
	/**
		* param1 - In date case start date
				 - Other case tbl column name
		* param2 - In date case end  date
				 - Other case tbl column value
		* param3 - Filter value(type)
		* param4 - Column name in case of date
	**/
	vm.InjectWhereClause = function(param1,param2,type,colName){

			if(type == 'date')
			{
					injectString = "  DATE_FORMAT("+colName+", '%d/%m/%Y') BETWEEN '"+vm.startDate+"' AND  '"+ vm.endDate+"'";
						if(vm.startDate >= vm.endDate )
						{
							alert("start date should be less than to end date");	
							error = true;
						}	
			}
			else if(param1 == 'Barcode_No')
			{
				injectString = "  pbd."+param1+" = '"+param2+"'";	
			}
			else if(param1 == 'Bill_No')
			{
				injectString = " sb."+param1+" = '"+param2+"'";	
			}
			else
			{
				injectString = param1+" = '"+param2+"'"; 
			}
		
		return injectString;
	}
	

	vm.ShowReport = function(){
		var condition = '';
		error = false; 
		if(vm.report == 'PurchaseDetails')
		{
			vm.thHeading = reportsData[vm.report]['r_heading'];
			if(vm.selectedOption !='' && vm.selectedOption != undefined)
			{
					if(vm.selectedOption == 'date')
					{		
						condition = vm.InjectWhereClause(vm.startDate,vm.endDate,vm.selectedOption,'pbd.datetime');			
					}
					else
					{
						condition = vm.InjectWhereClause(vm.selectedOption,vm.optionValue,'','');
					}
					
					if(error == false)
					{
						HttpQry = "qry="+reportsData[vm.report]['r_query']+ condition;	   	
				 		vm.getDetails();
				 	}
			}
		}
		else if(vm.report == 'SalesDetails')
		{
			//vm.thHeading = ["Date","Bill No","Bill Amt","Cash Paid","Cr.Card Amt","Cheque Amt","Gift Voucher Amt","FOC Amt","Dis Amt","VAT","Balance"];
			vm.thHeading = JSON.parse(reportsData[vm.report]['r_heading']);
			if(vm.selectedOption !='' && vm.selectedOption != undefined)
			{
					if(vm.selectedOption == 'date')
					{		
						condition = vm.InjectWhereClause(vm.startDate,vm.endDate,vm.selectedOption,'Date');			
					}
					else
					{
						condition = vm.InjectWhereClause(vm.selectedOption,vm.optionValue,'','');
					}
					if(error == false)
					{
						HttpQry = "qry="+reportsData[vm.report]['r_query'] +" "+reportsData[vm.report]['r_where'] +" " + condition + " " + reportsData[vm.report]['r_grp_by'];	   	
				 		vm.getDetails();
				 	}
			}
		}
		else if(vm.report == 'ItemSalesDetails')
		{
			vm.thHeading =['Date','Bill No','Product Category','MRP','Qty','Total val'];
			// reportsData[vm.report]['r_heading'];
			//console.log(reportsData[vm.report]['r_heading']);
			if(vm.selectedOption !='' && vm.selectedOption != undefined)
			{
					if(vm.selectedOption == 'date')
					{		
						condition = vm.InjectWhereClause(vm.startDate,vm.endDate,vm.selectedOption,'Date');			
					}
					else
					{
						condition = vm.InjectWhereClause(vm.selectedOption,vm.optionValue,'','');
					}
					if(error == false)
					{
						HttpQry = "qry="+reportsData[vm.report]['r_query']+ condition;	   	
				 		vm.getDetails();
				 	}
			}
		}
		else if(vm.report == 'FOCDetails')
		{
			vm.thHeading =['Date','Bill No','Dept. Code','Coupon','Bill Amt'];
			if(vm.selectedOption !='' && vm.selectedOption != undefined)
			{
					if(vm.selectedOption == 'date')
					{		
						condition = vm.InjectWhereClause(vm.startDate,vm.endDate,vm.selectedOption,'Date');			
					}
					else
					{
						condition = vm.InjectWhereClause(vm.selectedOption,vm.optionValue,'','');
					}
					if(error == false)
					{
						HttpQry = "qry="+reportsData[vm.report]['r_query']+ condition;	   	
				 		vm.getDetails();
				 	}
			}
		}
		else if(vm.report == 'ItemTextDetails')
		{
			vm.thHeading =['Date','Bill No','Bill Amt','Apparel','Fabric'];
			if(vm.selectedOption !='' && vm.selectedOption != undefined)
			{
					if(vm.selectedOption == 'date')
					{		
						condition = vm.InjectWhereClause(vm.startDate,vm.endDate,vm.selectedOption,'Date');			
					}
					else
					{
						condition = vm.InjectWhereClause(vm.selectedOption,vm.optionValue,'','');
					}
					if(error == false)
					{
						HttpQry = "qry=SELECT Date,sb.Bill_No,Total_Amt_val,Total_Amt_val, IF(UOM like 'Pcs', 1, 0) as Apparel ,IF(UOM like'%Met%', 1, 0) as Fabric FROM sales_book as sb LEFT JOIN sales_bookdet as sbd ON sb.Bill_No = sbd.Bill_No "+ condition;	   	
				 		vm.getDetails();
				 	}
			}
		}
		else if(vm.report == 'CreditCardDetails')
		{
			vm.thHeading =['Date','Bill No','Bill Amt','Credit Card No / Name','Expiry Date','Credit Card Amount'];
			if(vm.selectedOption !='' && vm.selectedOption != undefined)
			{
					if(vm.selectedOption == 'date')
					{		
						condition = vm.InjectWhereClause(vm.startDate,vm.endDate,vm.selectedOption,'Date');			
					}
					else
					{
						condition = vm.InjectWhereClause(vm.selectedOption,vm.optionValue,'','');
					}
					if(error == false)
					{
						HttpQry = "qry=SELECT Date,sb.Bill_No,Total_Amt_val,Total_Amt_val, IF(UOM like 'Pcs', 1, 0) as Apparel ,IF(UOM like'%Met%', 1, 0) as Fabric FROM sales_book as sb LEFT JOIN sales_bookdet as sbd ON sb.Bill_No = sbd.Bill_No "+ condition;	   	
				 		vm.getDetails();
				 	}
			}
		}

	}

	vm.getDetails = function(){
		toastr.clear();
        toastr.success( "Please wait...", "Status");
    	API.call().then(function (response) {
               try{
						 console.log("----APICALL Details Json Data----");
				     	 console.log(response);
						 vm.model = [];
						 if(response.indexOf("[]") == -1){
							 vm.model =  response;
						 }
				  		//console.log(vm.model);
                        toastr.clear();
						toastr.success( "Report Ready", "Status");

                   }catch(e){
                       console.log(e);
                       toastr.error("error", "Status");
                   }
         });
	}
}	//	vm.ShowReport(vm.SetQuery);
}]);

