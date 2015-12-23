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
.controller("ReportsController", ['API','$http','$location',function (API,$http,$location) {
    var vm = this;
 	var error= false;
 	vm.report = $location.search().r;
   	HttpQry = 'action=getAllReports';
	$("body").toggleClass("mini-navbar");   	
   	var reportsData =[];
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
	vm.moreoption=['1'];
	vm.addOption =function(){
		vm.moreoption.push(vm.moreoption.length+ 1);
		vm.filterOption.push({"fieldName":"","operator":"","value1":"","value2":"","DataType":""});
	}
	vm.startReport = function(){

	vm.Filters = JSON.parse(reportsData[vm.report]['r_filters']);

	vm.InjectWhereClause = function(selected){
			console.log(selected.length);
			var injectCondition ='';
			for(var i=0;i<selected.length;i++)
			{
				console.log(selected[i]);
				if(i != 0)
				{
					injectCondition += ' AND '; 
				}
				if(selected[i].operator == 'BETWEEN' && selected[i].DataType =='Date')
				{
					injectCondition +="DATE_FORMAT("+selected[i].fieldName+", '%d/%m/%Y') BETWEEN '"+selected[i].value1+"' AND  '"+ selected[i].value2+"'";
				}
				else if(selected[i].operator == 'LIKE' && selected[i].DataType =='String')
				{
					injectCondition += selected[i].fieldName+" LIKE  '"+selected[i].value1+"'";
				}
				else if(selected[i].DataType =='String')
				{
					injectCondition += selected[i].fieldName+" "+selected[i].operator+" '"+selected[i].value1+"'";
				}
				else if(selected[i].DataType =='Number')
				{
					injectCondition += selected[i].fieldName+" "+selected[i].operator+" "+selected[i].value1;
				}
			 
			}
			return injectCondition; 
	}
	vm.filterOption = [{"fieldName":"","operator":"","value1":"","value2":"","DataType":""}];

	vm.OperatorArray = [{"placeholder":"Enter date","key":"=","value":"EQUAL"},
						{"placeholder":"Enter date","key":">","value":"GRETER THEN"},
						{"placeholder":"Enter Value","key":"<","value":"LESS THEN"},
						{"placeholder":"Enter Value","key":"<=","value":"LESS + EQUAL"},
						{"placeholder":"Enter Value","key":">=","value":"GRETER + EQUAL"},
						{"placeholder":"Enter Value","key":"LIKE","value":"LIKE"},
						{"placeholder":"DD/MM/YYYY","key":"BETWEEN","value":"BETWEEN"}];
			
	vm.changeSelect = function(q){
		console.log(q);
	}			
	vm.ShowReport = function(){
		var condition = '';
		error = false; 
		if(vm.report == reportsData[vm.report]['r_title'])
		{
			vm.thHeading = JSON.parse(reportsData[vm.report]['r_heading']);
			condition = vm.InjectWhereClause(vm.filterOption);
			if(error == false)
				{
							HttpQry = "qry="+reportsData[vm.report]['r_query'] +" "+reportsData[vm.report]['r_where'] +" " + condition + " " + reportsData[vm.report]['r_grp_by'];	   	
							vm.currentQuery = HttpQry;
							vm.getDetails();
				}
			
		}
		/*else if(vm.report == 'SalesDetails')
		{		
			vm.thHeading = JSON.parse(reportsData[vm.report]['r_heading']);
			condition = vm.InjectWhereClause(vm.filterOption);
			if(error == false)
				{
							HttpQry = "qry="+reportsData[vm.report]['r_query'] +" "+reportsData[vm.report]['r_where'] +" " + condition + " " + reportsData[vm.report]['r_grp_by'];	   	
							vm.getDetails();
				}
			
		}
		else if(vm.report == 'ItemSalesDetails')
		{
			vm.thHeading = JSON.parse(reportsData[vm.report]['r_heading']);
			condition = vm.InjectWhereClause(vm.filterOption);
			if(error == false)
				{
					HttpQry = "qry="+reportsData[vm.report]['r_query'] +" "+reportsData[vm.report]['r_where'] +" " + condition + " " + reportsData[vm.report]['r_grp_by'];	   	
					vm.getDetails();
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
			vm.thHeading = JSON.parse(reportsData[vm.report]['r_heading']);
			condition = vm.InjectWhereClause(vm.filterOption);
			if(error == false)
				{
					HttpQry = "qry="+reportsData[vm.report]['r_query'] +" "+reportsData[vm.report]['r_where'] +" " + condition + " " + reportsData[vm.report]['r_grp_by'];	   	
					vm.getDetails();
				}
			
		}
		else if(vm.report == 'CreditCardDetails')
		{
			vm.thHeading = JSON.parse(reportsData[vm.report]['r_heading']);
			condition = vm.InjectWhereClause(vm.filterOption);
			if(error == false)
				{
					HttpQry = "qry="+reportsData[vm.report]['r_query'] +" "+reportsData[vm.report]['r_where'] +" " + condition + " " + reportsData[vm.report]['r_grp_by'];	   	
					vm.getDetails();
				}
		}
		else if(vm.report == 'ChequeDetails')
		{
			vm.thHeading = JSON.parse(reportsData[vm.report]['r_heading']);
			condition = vm.InjectWhereClause(vm.filterOption);
			if(error == false)
				{
					HttpQry = "qry="+reportsData[vm.report]['r_query'] +" "+reportsData[vm.report]['r_where'] +" " + condition + " " + reportsData[vm.report]['r_grp_by'];	   	
					vm.getDetails();
				}

		}*/

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
}
}]);

