sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
    'sap/ui/model/json/JSONModel',
    './xlsx/xlsx',
    './xlsx/xlsx.bundle',
    "sap/ui/core/Fragment",
    'sap/m/p13n/Engine',
    'sap/m/p13n/MetadataHelper',
    'sap/m/p13n/SelectionController',
    'sap/m/p13n/SortController',
    'sap/m/p13n/GroupController',
    'sap/ui/model/odata/v2/ODataModel',
    'sap/m/MessageItem',
    'sap/m/MessageView',
    "sap/m/MessageBox",
    'sap/m/Dialog',
    'sap/m/Button',
    'sap/m/Bar',
    'sap/m/Title',
    'sap/ui/core/IconPool',
    'sap/ui/core/library',
    "sap/ui/core/syncStyleClass",
    'sap/ui/model/Filter',
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (
        Controller,
        MessageToast,
        JSONModel,
        XLSXjs,
        styleXLSXjs,
        Fragment,
        Engine,
        MetadataHelper,
        SelectionController,
        SortController,
        GroupController,
        ODataModel,
        MessageItem,
        MessageView,
        MessageBox,
        Dialog,
        Button,
        Bar,
        Title,
        IconPool,
        coreLibrary,
        syncStyleClass,
        Filter
        ) {
        "use strict";
        var sResponsivePaddingClasses = "sapUiResponsivePadding--header sapUiResponsivePadding--content sapUiResponsivePadding--footer";
        var TitleLevel = coreLibrary.TitleLevel;
        return Controller.extend("zupfi.controller.Main", {
            // global variable
            pDialog: null,
            pTemp:0,
            pFileName: null,
            dataUpload: [],
            isDocumentPosted : null,
            onInit: function () {
                var oModel = new JSONModel();
                this.getView().setModel(oModel);
                this._registerForP13n();

            },
            _registerForP13n: function () {

                var oTable = this.byId("idMainTable");
                this.oMetadataHelper = new MetadataHelper([
                    { key: "id_doc", label: "ID  ", path: "id_doc" },
                    { key: "accountingdocument", label: "Accounting Document  ", path: "accountingdocument" },
                    { key: "documentdate", label: "Document Date", path: "documentdate" },
                    { key: "postingdate", label: "Posting Date", path: "postingdate" },
                    { key: "documenttype", label: "Document Type", path: "documenttype" },
                    { key: "companycode", label: "Company Code", path: "companycode" },
                    { key: "currency", label: "Currency", path: "currency" },
                    { key: "exchangerate", label: "Exchange Rate", path: "exchangerate" },
                    { key: "headertext", label: "Header Text", path: "headertext" },
                    { key: "referencedoc", label: "Reference Document", path: "referencedoc" },
                    { key: "headerref1", label: "Header Reference 1", path: "headerref1" },
                    { key: "postingkey", label: "Posting Key", path: "postingkey" },
                    { key: "account", label: "Account", path: "account" },
                    { key: "mainassetnumber", label: "Main Asset Number", path: "mainassetnumber" },
                    { key: "subassetnumber", label: "Sub Asset Number", path: "subassetnumber" },
                    { key: "specialglaccount", label: "Special GL Account", path: "specialglaccount" },
                    { key: "assettransactiontype", label: "Asset TrnsType", path: "assettransactiontype" },
                    { key: "amountindoumentcurrency", label: "Account in DocCur", path: "amountindoumentcurrency" },
                    { key: "amountinlocalcurrency", label: "Account in Local Curr", path: "amountinlocalcurrency" },
                    { key: "taxbaseamountdocument", label: "Tax Base Amt", path: "taxbaseamountdocument" },
                    // thêm ở đây 
                    { key: "taxbaseamountlocal", label: "Local Tax Base Amt", path: "taxbaseamountlocal" },                    
                    //
                    { key: "assignment", label: "Assignment", path: "assignment" },
                    { key: "businessarea", label: "Business Area", path: "businessarea" },
                    { key: "costcenter", label: "Cost Center", path: "costcenter" },
                    { key: "profitcenter", label: "Profit Center", path: "profitcenter" },
                    { key: "internalorder", label: "Internal Order", path: "internalorder" },
                    { key: "assetvaluedate", label: "Asset Value Date", path: "assetvaluedate" },
                    { key: "itemtext", label: "Item Text", path: "itemtext" },
                    { key: "overrideglaccount", label: "Override GL Account", path: "overrideglaccount" },
                    { key: "taxcode", label: "Tax Code", path: "taxcode" },
                    { key: "segment", label: "Segment", path: "segment" },
                    { key: "paymentterm", label: "Payment Term", path: "paymentterm" },
                    { key: "paymentblock", label: "Payment Bloc", path: "paymentblock" },
                    { key: "paymentmethod", label: "Payment Method", path: "paymentmethod" },
                    { key: "baselinedate", label: "Baseline Date", path: "baselinedate" },
                    { key: "valuedate", label: "Value Date", path: "valuedate" },
                    { key: "contractnumber", label: "Contract Number", path: "contractnumber" },
                    { key: "contracttype", label: "Contract Type", path: "contracttype" },
                    { key: "housebank", label: "House Bank", path: "housebank" },
                    { key: "ref1", label: "Ref 1", path: "ref1" },
                    { key: "ref2", label: "Ref 2", path: "ref2" },
                    { key: "ref3", label: "Ref 3", path: "ref3" },
                    { key: "bankaccountid", label: "Bank Account ID", path: "bankaccountid" },
                    { key: "invoicerefnum", label: "Invoice Reference Number", path: "invoicerefnum" },
                    { key: "invoicereffiscalyear", label: "Invoice Reference Fiscal Year", path: "invoicereffiscalyear" },
                    { key: "invoicereflineitem", label: "Invoice Reference Line Ite,", path: "invoicereflineitem" },
                    { key: "purchasingorder", label: "Purchasing Order", path: "purchasingorder" },
                    { key: "purchasingitem", label: "Purchasing Ite,", path: "purchasingitem" },
                    { key: "saleorder", label: "Sales Order", path: "saleorder" },
                    { key: "saleorderitem", label: "Sales Order Item", path: "saleorderitem" },
                    { key: "negativeposting", label: "Negative Posting", path: "negativeposting" },
                    { key: "alternativepayee", label: "Alternative Payee", path: "payee" },
                    { key: "mst", label: "Mã số thuế", path: "mst" },
                    { key: "name1", label: "Họ tên NCC 1", path: "name1" },
                    { key: "name2", label: "Họ tên NCC", path: "name2" },
                    { key: "city", label: "Cỉty", path: "city" },
                    { key: "country", label: "Country", path: "country" },
                    { key: "tennccxuathd", label: "Tên NCC xuất hoá đơn", path: "tennccxuathd" },
                    { key: "mstnccxuathd", label: "MST NCC xuất hoá đơn", path: "mstnccxuathd" },
                    { key: "customer", label: "Customer - COPA", path: "customer" }
                ]);
                Engine.getInstance().register(oTable, {
                    helper: this.oMetadataHelper,
                    controller: {
                        Columns: new SelectionController({
                            targetAggregation: "columns",
                            control: oTable
                        }),
                        Sorter: new SortController({
                            control: oTable
                        }),
                        Groups: new GroupController({
                            control: oTable
                        })
                    }
                });

                Engine.getInstance().attachStateChange(this.handleStateChange.bind(this));
            },
            openUploadFragment: function () {
                this.dataUpload = [];
                if (!this.pDialog) {
                    Fragment.load({
                        id: "excel_upload",
                        name: "zupfi.controller.fragment.ExcelUpload",
                        type: "XML",
                        controller: this
                    }).then((oDialog) => {
                        var oFileUploader = Fragment.byId("excel_upload", "uploadSet");
                        oFileUploader.removeAllItems();
                        this.pDialog = oDialog;
                        this.pDialog.open();
                    })
                    .catch(error => alert('Try again'));
                } else {
                    var oFileUploader = Fragment.byId("excel_upload", "uploadSet");
                    oFileUploader.removeAllItems();
                    this.pDialog.open();
                }
            },
            onCloseDialog: function () {
                this.pDialog.close();
            },
            onUploadSetComplete: async function (oEvent) {
                var oFileUploader = Fragment.byId("excel_upload", "uploadSet");
                var oFile = oFileUploader.getItems()[0].getFileObject();
                //Đọc file
                var reader = new FileReader();
                var thatController = this;
                //Lấy tên file
                thatController.pFileName = oFile.name

                //Check file đã được upload chưa -> check trùng tên
                var logUrl = `https://${window.location.host}/sap/opu/odata/sap/ZFI_API_UPLOAD_FIDOC_O2/`
                var oModelUploadDoc =  new ODataModel(logUrl, {json :true })
                var oFilter = new Filter("filename", "EQ", thatController.pFileName);
                let checkExist = new Promise((resolve, reject) => {
                    oModelUploadDoc.read("/ZFI_I_UPLOAD", {
                        filters: [oFilter],
                        success: function(oData, response){ //found
                            if (oData.results && oData.results.length !== 0 ) {
                                MessageBox.warning(
                                    "File đã được post, bạn có muốn overwrite ?",
                                    {
                                        icon: MessageBox.Icon.WARNING,
                                        title: "Warning",
                                        actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                                        emphasizedAction: MessageBox.Action.OK,
                                        initialFocus: MessageBox.Action.CANCEL,
                                        styleClass: sResponsivePaddingClasses,
                                        onClose: function(sAction) {
                                            if (sAction == 'OK') {
                                                resolve()
                                            } else {
                                                reject()
                                            }}
                                    });
                            } else {
                                resolve() }
                        }, 
                        error: function(error) { //not found
                            resolve() 
                        }
                    });
                })
                checkExist
                .then((value) =>{
                    reader.onload = (e) => {
                        let xlsx_content = e.currentTarget.result;
                        let workbook = XLSX.read(xlsx_content, { type: 'binary' });
                        var excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets["Data"]);
                        excelData.forEach((value, index) => {
                            thatController.dataUpload.push(value)
                        })
                        var model = thatController.getView().getModel()
                        model.setProperty("/items", thatController.dataUpload, null, true)
                        thatController.pDialog.close();
                    };
                    reader.readAsBinaryString(oFile)
                    thatController.pDialog.close();
                    MessageToast.show("Upload Successful");

                })
                .catch((error) =>{
                    thatController.pDialog.close();
                    MessageToast.show("Upload cancelled");
                })


            },
            openSetting: function (oEvt) {
                var oTable = this.byId("idMainTable");
                Engine.getInstance().show(oTable, ["Columns", "Sorter"], {
                    contentHeight: "35rem",
                    contentWidth: "32rem",
                    source: oEvt.getSource()
                });
            },
            handleStateChange: function (oEvt) {
                var oTable = this.byId("idMainTable");
                var oState = oEvt.getParameter("state");

                oTable.getColumns().forEach(function (oColumn) {
                    oColumn.setVisible(false);
                });

                oState.Columns.forEach(function (oProp, iIndex) {
                    var oCol = this.byId(oProp.key);
                    oCol.setVisible(true);
                    oTable.removeColumn(oCol);
                    oTable.insertColumn(oCol, iIndex);
                }.bind(this));
            },
            checkNullDate: function(str){
                if (!str || str.length !== 10) {
                    return ''
                }
                else {
                   return `${str.substring(6)}${str.substring(3, 5)}${str.substring(0, 2)}`
                }
            },
            checkNullData: function(str){
                if (!str) {
                    return ''
                }
                else {
                   return `${str}`
                }
            },
            checkNullNumber: function(str){
                if (!str || str === '') {
                    return '0'
                }
                else {
                   return `${str}`
                }
            },

            uploadDocSuccessHandler: function (result) {
                console.log(result)
            },
            uploadDocErrorHandler: function (err) {
                console.log(responseText)
                MessageBox.error(responseText.error.message.value);
                this.dataUpload = []
            },
            checkData: function (oEvent) {
                this.callApiFiDoc(oEvent, 'X')  
            },
            postData : function (oEvent) {
                this.callApiFiDoc(oEvent,' ')
            },
            deQuy1 : function (listDoc,checkStop,callAPIForPostingList,count,lengListDoc,isupdate,testmode,dem){
                let thatController = this
                var notLoop = false
                if(listDoc.size != 0){
                listDoc.forEach(function (value, pIDDoc, key) {
                    if(count != 1000){
                    let doc = []
                    let item_doc = []
                    value.forEach( function(item, index) { 
                        item_doc.push({
                            idLine: `${index + 1}`,
                            postingkey: thatController.checkNullData(item.postingkey),
                            account: thatController.checkNullData(item.account),
                            mainassetnumber: thatController.checkNullData(item.mainassetnumber),
                            subassetnumber: thatController.checkNullData(item.subassetnumber),
                            specialglaccount: thatController.checkNullData(item.specialglaccount),
                            assettransactiontype: thatController.checkNullData(item.assettransactiontype),
                            amountinlocalcurrency: thatController.checkNullData(item.amountinlocalcurrency),
                            transactioncurrency: thatController.checkNullData(item.currency),
                            amountindoumentcurrency: thatController.checkNullNumber(item.amountindoumentcurrency),
                            taxbaseamount: thatController.checkNullNumber(item.taxbaseamountdocument),
                            // thêm ở đây
                            localtaxbaseamount: thatController.checkNullNumber(item.taxbaseamountlocal),
                            //
                            assignment: thatController.checkNullData(item.assignment),
                            businessarea: thatController.checkNullData(item.businessarea),
                            costcenter: thatController.checkNullData(item.costcenter),
                            profitcenter: thatController.checkNullData(item.profitcenter),
                            internalorder: thatController.checkNullData(item.internalorder),
                            assetvaluedate: thatController.checkNullDate(item.assetvaluedate),
                            itemtext: thatController.checkNullData(item.itemtext),
                            overrideglaccount: thatController.checkNullData(item.overrideglaccount),
                            taxcode: thatController.checkNullData(item.taxcode),
                            segment: thatController.checkNullData(item.segment),
                            paymentterms: thatController.checkNullData(item.paymentterms),
                            paymentblockreason: thatController.checkNullData(item.paymentblockreason),
                            paymentmethod: thatController.checkNullData(item.paymentmethod),
                            baselinedate: thatController.checkNullDate(item.baselinedate),
                            valuedate: thatController.checkNullDate(item.valuedate),
                            contractnumber: thatController.checkNullData(item.contractnumber),
                            contracttype: thatController.checkNullData(item.contracttype),
                            housebank: thatController.checkNullData(item.housebank),
                            bankaccountid: thatController.checkNullData(item.bankaccountid),
                            invoicerefnum: thatController.checkNullData(item.invoicerefnum),
                            invoicefiscalyear: thatController.checkNullData(item.invoicefiscalyear),
                            invoicereflineitem: thatController.checkNullData(item.invoicereflineitem),
                            purchasingno: thatController.checkNullData(item.purchasingno),
                            purchasingitem: thatController.checkNullData(item.purchasingitem),
                            saleorder: thatController.checkNullData(item.saleorder),
                            saleorderitem: thatController.checkNullData(item.saleorderitem),
                            ref1: thatController.checkNullData(item.ref1),
                            ref2: thatController.checkNullData(item.ref2),
                            ref3: thatController.checkNullData(item.ref3),
                            longtext: thatController.checkNullData(item.longtext),
                            material: thatController.checkNullData(item.material),
                            unit: thatController.checkNullData(item.unit),
                            name1: thatController.checkNullData(item.name1),
                            name2: thatController.checkNullData(item.name2),
                            city: thatController.checkNullData(item.city),
                            country: thatController.checkNullData(item.country),
                            vatregno: thatController.checkNullData(item.vatregno),
                            quantity: thatController.checkNullNumber(item.quantity),
                            customer: thatController.checkNullData(item.customer),
                            supplier: thatController.checkNullData(item.supplier),
                            exchangerate: thatController.checkNullNumber(item.exchangerate),
                            alternativepayee: thatController.checkNullData(item.alternativepayee),
                            mst: thatController.checkNullData(item.mst),
                            name1: thatController.checkNullData(item.name1),
                            name2: thatController.checkNullData(item.name2),
                            city: thatController.checkNullData(item.city),
                            country: thatController.checkNullData(item.country),
                            tennccxuathd:thatController.checkNullData(item.tennccxuathd),
                            mstnccxuathd:thatController.checkNullData(item.mstnccxuathd)
                        })
                    } )
                    doc.push({
                        filename: thatController.pFileName,
                        idDoc: pIDDoc,
                        companycode: value[0].companycode,
                        documentdate: thatController.checkNullDate(value[0].documentdate),
                        postingdate: thatController.checkNullDate(value[0].postingdate),
                        documenttype: value[0].documenttype,
                        currency: value[0].currency,
                        headertext: value[0].headertext,
                        referencedoc: value[0].referencedoc,
                        headerref1: value[0].headerref1,
                        negativeposting: value[0].negativeposting,
                        toItem : item_doc
                    })
                            // var checkStop = false
                            // while(!checkStop){
                            //     if(thatController.pTemp == callAPIForPostingList.length){
                            //         checkStop = true
                            //         callAPIForPostingList.push(thatController.callAPIForPosting(isupdate,testmode, doc))
                            //     }
                            // }
                            listDoc.delete(pIDDoc)
                            callAPIForPostingList.push(thatController.callAPIForPosting(isupdate,testmode, doc))
                            count++;
                            checkStop++;
                }
                else if (!notLoop) {
                    notLoop = true
                    Promise.all(callAPIForPostingList)
                    .then(listResponse=>{
                        thatController.deQuy1(listDoc,checkStop,callAPIForPostingList,0,lengListDoc,isupdate,testmode,dem)
                    })
                    .catch((error)=>{
                        MessageBox.error(JSON.stringify(error))
                        oBusyDialog.close()  
                    })
                    
                }
                 });}
                if(listDoc.size == 0){
                    let oModel= this.getView().getModel()
                    let oBusyDialog = this.byId("idBusyDialog")
                    Promise.all(callAPIForPostingList)
                    .then(listResponse=>{
                        let message = []
                        listResponse.forEach((value)=>{
                            value.forEach((item)=>{
                                message.push(item)
                            })
                        })
    
                        var oMessageTemplate = new MessageItem({ // Message view template
                            type: '{type}',
                            title: '{title}',
                            groupName: '{group}'
                        });    
                        this.oCallApiMsgView = new MessageView({ //MessageView for response from Post FI Doc API
                            showDetailsPageHeader: false,
                            itemSelect: function () {
                                oBackButton.setVisible(true);
                            },
                            items: {
                                path: "/",
                                template: oMessageTemplate
                            },
                            groupItems: true
                        })
                        var oBackButton = new Button({ //Back button for response from Post FI Doc API
                            icon: IconPool.getIconURI("nav-back"), 
                            visible: false,
                            press: function () {
                                that.oCallApiMsgView.navigateBack();
                                this.setVisible(false);
                            }
                        });
                        this.oCallApiMsgViewDialog = new Dialog({ //Dialog for response from Post FI Doc API
                            resizable: true,
                            content: this.oCallApiMsgView,
                            state: 'Information',
                            beginButton: new Button({
                                press: function () {
                                    this.getParent().close();
                                },
                                text: "Close"
                            }),
                            customHeader: new Bar({
                                contentLeft: [oBackButton],
                                contentMiddle: [
                                    new Title({
                                        text: "Messages",
                                        level: TitleLevel.H1
                                    })
                                ]
                            }),
                            contentHeight: "50%",
                            contentWidth: "50%",
                            verticalScrolling: false
                        })
                        let messageJSON = JSON.parse(JSON.stringify(message))
                        var oMsgModel = new JSONModel();
                        oMsgModel.setData(messageJSON)
                        oMsgModel.setSizeLimit(1000000)
                        this.oCallApiMsgView.setModel(oMsgModel)
                        this.oCallApiMsgView.navigateBack();
                        this.oCallApiMsgViewDialog.open();
                        oModel.setProperty("/items", thatController.dataUpload, null, true)           
                        oBusyDialog.close()               
                    })
                    .catch((error)=>{
                        MessageBox.error(JSON.stringify(error))
                        console.log(error)
                        oBusyDialog.close()  
                    })
                    return 
            }
            },
            callApiFiDoc : function (oEvent, testmode) {
                let thatController = this
                var listDoc = new Map()
                this.dataUpload.forEach((value, index) => {
                    if (!listDoc.has(value.id_doc)) {
                        listDoc.set(value.id_doc, [value])
                    } else {
                        listDoc.get(value.id_doc).push(value)
                    }
                })                
                let callAPIForPostingList = []
                let isupdate

                if  (thatController.isDocumentPosted) {
                    isupdate = 'X'
                } else {
                    isupdate = ''
                }
                let oBusyDialog = this.byId("idBusyDialog")
                oBusyDialog.open()
                console.log(listDoc)
                thatController.deQuy1(listDoc,0,callAPIForPostingList,0,listDoc.size,isupdate,testmode,0)


                // listDoc.forEach(function (value, pIDDoc, key) {
                //     let doc = []
                //     let item_doc = []
                //     console.log(value)
                //     console.log(pIDDoc)
                //     value.forEach( function(item, index) { 
                //         item_doc.push({
                //             idLine: `${index + 1}`,
                //             postingkey: thatController.checkNullData(item.postingkey),
                //             account: thatController.checkNullData(item.account),
                //             mainassetnumber: thatController.checkNullData(item.mainassetnumber),
                //             subassetnumber: thatController.checkNullData(item.subassetnumber),
                //             specialglaccount: thatController.checkNullData(item.specialglaccount),
                //             assettransactiontype: thatController.checkNullData(item.assettransactiontype),
                //             amountinlocalcurrency: thatController.checkNullData(item.amountinlocalcurrency),
                //             transactioncurrency: thatController.checkNullData(item.currency),
                //             amountindoumentcurrency: thatController.checkNullNumber(item.amountindoumentcurrency),
                //             taxbaseamount: thatController.checkNullNumber(item.taxbaseamount),
                //             assignment: thatController.checkNullData(item.assignment),
                //             businessarea: thatController.checkNullData(item.businessarea),
                //             costcenter: thatController.checkNullData(item.costcenter),
                //             profitcenter: thatController.checkNullData(item.profitcenter),
                //             internalorder: thatController.checkNullData(item.internalorder),
                //             assetvaluedate: thatController.checkNullDate(item.assetvaluedate),
                //             itemtext: thatController.checkNullData(item.itemtext),
                //             overrideglaccount: thatController.checkNullData(item.overrideglaccount),
                //             taxcode: thatController.checkNullData(item.taxcode),
                //             segment: thatController.checkNullData(item.segment),
                //             paymentterms: thatController.checkNullData(item.paymentterms),
                //             paymentblockreason: thatController.checkNullData(item.paymentblockreason),
                //             paymentmethod: thatController.checkNullData(item.paymentmethod),
                //             baselinedate: thatController.checkNullDate(item.baselinedate),
                //             valuedate: thatController.checkNullDate(item.valuedate),
                //             contractnumber: thatController.checkNullData(item.contractnumber),
                //             contracttype: thatController.checkNullData(item.contracttype),
                //             housebank: thatController.checkNullData(item.housebank),
                //             bankaccountid: thatController.checkNullData(item.bankaccountid),
                //             invoicerefnum: thatController.checkNullData(item.invoicerefnum),
                //             invoicefiscalyear: thatController.checkNullData(item.invoicefiscalyear),
                //             invoicereflineitem: thatController.checkNullData(item.invoicereflineitem),
                //             purchasingno: thatController.checkNullData(item.purchasingno),
                //             purchasingitem: thatController.checkNullData(item.purchasingitem),
                //             saleorder: thatController.checkNullData(item.saleorder),
                //             saleorderitem: thatController.checkNullData(item.saleorderitem),
                //             ref1: thatController.checkNullData(item.ref1),
                //             ref2: thatController.checkNullData(item.ref2),
                //             ref3: thatController.checkNullData(item.ref3),
                //             longtext: thatController.checkNullData(item.longtext),
                //             material: thatController.checkNullData(item.material),
                //             unit: thatController.checkNullData(item.unit),
                //             name1: thatController.checkNullData(item.name1),
                //             name2: thatController.checkNullData(item.name2),
                //             city: thatController.checkNullData(item.city),
                //             country: thatController.checkNullData(item.country),
                //             vatregno: thatController.checkNullData(item.vatregno),
                //             quantity: thatController.checkNullNumber(item.quantity),
                //             customer: thatController.checkNullData(item.customer),
                //             supplier: thatController.checkNullData(item.supplier),
                //             negativeposting: thatController.checkNullData(item.negativeposting),
                //             exchangerate: thatController.checkNullNumber(item.exchangerate),
                //             alternativepayee: thatController.checkNullData(item.alternativepayee),
                //             mst: thatController.checkNullData(item.mst),
                //             name1: thatController.checkNullData(item.name1),
                //             name2: thatController.checkNullData(item.name2),
                //             city: thatController.checkNullData(item.city),
                //             country: thatController.checkNullData(item.country),
                //             tennccxuathd:thatController.checkNullData(item.tennccxuathd),
                //             mstnccxuathd:thatController.checkNullData(item.mstnccxuathd)
                //         })
                //     } )
                //     doc.push({
                //         filename: thatController.pFileName,
                //         idDoc: pIDDoc,
                //         companycode: value[0].companycode,
                //         documentdate: thatController.checkNullDate(value[0].documentdate),
                //         postingdate: thatController.checkNullDate(value[0].postingdate),
                //         documenttype: value[0].documenttype,
                //         currency: value[0].currency,
                //         headertext: value[0].headertext,
                //         referencedoc: value[0].referencedoc,
                //         headerref1: value[0].headerref1,
                //         toItem : item_doc
                //     })
                //     listDoc.delete(pIDDoc)
                //             // var checkStop = false
                //             // while(!checkStop){
                //             //     if(thatController.pTemp == callAPIForPostingList.length){
                //             //         checkStop = true
                //             //         callAPIForPostingList.push(thatController.callAPIForPosting(isupdate,testmode, doc))
                //             //     }
                //             // }
                //             // callAPIForPostingList.push(thatController.callAPIForPosting(isupdate,testmode, doc))
                //             // console.log(thatController.pTemp)
                //             // console.log("Trong for")


                // }); 

                
            },
            callAPIForPosting : async function(isupdate,testmode, doc){
                let postFIUrl = "https://" + window.location.hostname + "/sap/bc/http/sap/zfi_api_upload_fidoc";
                let thatController = this
                let requestJSON = JSON.stringify({
                    isupdate : isupdate,
                    testmode : testmode,
                    filename : thatController.pFileName,
                    doc: doc
                }) 
                return new Promise((resolve, reject)=>{
                    $.ajax({
                        url: postFIUrl,
                        type: "POST",
                        contentType: 'application/json',
                        data: requestJSON,
                        success: async function(response, textStatus, jqXHR){
                            let oResponse = JSON.parse(response); 
                            let message = []
                            oResponse.results.forEach( function(value, index) {
                                message.push({
                                    type: value.type,
                                    title: value.message,
                                    group: `ID Doc ${value.idDoc}`
                                })
            
                                thatController.dataUpload
                                .filter((oFilter) => oFilter.id_doc == value.idDoc)
                                .forEach((oElement)=> {
                                    oElement.accountingdocument = value.accountingdocument
                                    oElement.accountingdocument_visible = true
                                })
                                resolve(message)                                  
                            })
                            thatController.pTemp++;
                        },
                        error: function(error, data){
                            reject(error)

                        }
                    })
                })
            },
            callApiFiDocErrorHandle: function (error){
                MessageBox.error(JSON.stringify(error));
                return
            },
            onDowloadTemplate: function(oEvent){
                var excelColumnList = [
                    {
                        id_doc : '',
                        documentdate : '',
                        postingdate : '',
                        documenttype : '',
                        companycode : '',
                        currency : '',
                        exchangerate : '',
                        headertext : '',
                        referencedoc : '',
                        headerref1 : '',
                        postingkey : '',
                        account : '',
                        mainassetnumber : '',
                        subassetnumber : '',
                        specialglaccount : '',
                        assettransactiontype : '',
                        amountindoumentcurrency : '',
                        amountinlocalcurrency : '',
                        taxbaseamountdocument : '',
                        // thêm ở đây 20
                        taxbaseamountlocal : '',
                        //
                        assignment : '',
                        businessarea : '',
                        costcenter : '',
                        profitcenter : '',
                        internalorder : '',
                        assetvaluedate : '',
                        itemtext : '',
                        overrideglaccount : '',
                        taxcode : '',
                        segment : '',
                        paymentterm : '',
                        paymentblock : '',
                        paymentmethod : '',
                        baselinedate : '',
                        valuedate : '',
                        contractnumber : '',
                        contracttype : '',
                        housebank : '',
                        bankaccountid : '',
                        invoicerefnum : '',
                        invoicereffiscalyear : '',
                        invoicereflineitem : '',
                        purchasingorder : '',
                        purchasingitem : '',
                        saleorder : '',
                        saleorderitem : '',
                        negativeposting : '',
                        alternativepayee : '',
                        mst : '',
                        name1 : '',
                        name2 : '',
                        city :'',
                        country:'',
                        tennccxuathd:'',
                        mstnccxuathd:'',
                        vatregno:'',
                        customer:'',
                        ref1:'',
                        ref2:'',
                        ref3:''
                    }
                    
                ]
                const xlsxData = XLSX.utils.json_to_sheet(excelColumnList)
                const spreadsheet = XLSX.utils.book_new()
                XLSX.utils.book_append_sheet(spreadsheet, xlsxData, 'Data')
                var header_styles = {
                    fill: {
                        fgColor: {
                            rgb: "FFB266"
                        }
                    },
                    font: {
                        bold: true,
                        sz: 11
                    },
                    alignment: {
                        horizontal: "center"
                    }
                };
                xlsxData["!cols"] = [ 
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    { wch: 20 },
                    // thêm ở đây
                    { wch: 20 },
                    //
                    { wch: 20 }
                 ]; 
                spreadsheet.Sheets["Data"].A1.s = header_styles
                spreadsheet.Sheets["Data"].A1.s = header_styles
                spreadsheet.Sheets['Data'].B1.s = header_styles
                spreadsheet.Sheets['Data'].C1.s = header_styles
                spreadsheet.Sheets['Data'].D1.s = header_styles
                spreadsheet.Sheets['Data'].E1.s = header_styles
                spreadsheet.Sheets['Data'].F1.s = header_styles
                spreadsheet.Sheets['Data'].G1.s = header_styles
                spreadsheet.Sheets['Data'].H1.s = header_styles
                spreadsheet.Sheets['Data'].I1.s = header_styles
                spreadsheet.Sheets['Data'].J1.s = header_styles
                spreadsheet.Sheets['Data'].K1.s = header_styles
                spreadsheet.Sheets['Data'].L1.s = header_styles
                spreadsheet.Sheets['Data'].M1.s = header_styles
                spreadsheet.Sheets['Data'].N1.s = header_styles
                spreadsheet.Sheets['Data'].O1.s = header_styles
                spreadsheet.Sheets['Data'].P1.s = header_styles
                spreadsheet.Sheets['Data'].Q1.s = header_styles
                spreadsheet.Sheets['Data'].R1.s = header_styles
                spreadsheet.Sheets['Data'].S1.s = header_styles
                spreadsheet.Sheets['Data'].T1.s = header_styles
                spreadsheet.Sheets['Data'].U1.s = header_styles
                spreadsheet.Sheets['Data'].V1.s = header_styles
                spreadsheet.Sheets['Data'].W1.s = header_styles
                spreadsheet.Sheets['Data'].X1.s = header_styles
                spreadsheet.Sheets['Data'].Y1.s = header_styles
                spreadsheet.Sheets['Data'].Z1.s = header_styles
                spreadsheet.Sheets['Data'].AA1.s = header_styles
                spreadsheet.Sheets['Data'].AB1.s = header_styles
                spreadsheet.Sheets['Data'].AC1.s = header_styles
                spreadsheet.Sheets['Data'].AD1.s = header_styles
                spreadsheet.Sheets['Data'].AE1.s = header_styles
                spreadsheet.Sheets['Data'].AF1.s = header_styles
                spreadsheet.Sheets['Data'].AG1.s = header_styles
                spreadsheet.Sheets['Data'].AH1.s = header_styles
                spreadsheet.Sheets['Data'].AI1.s = header_styles
                spreadsheet.Sheets['Data'].AJ1.s = header_styles
                spreadsheet.Sheets['Data'].AK1.s = header_styles
                spreadsheet.Sheets['Data'].AL1.s = header_styles
                spreadsheet.Sheets['Data'].AM1.s = header_styles
                spreadsheet.Sheets['Data'].AN1.s = header_styles
                spreadsheet.Sheets['Data'].AO1.s = header_styles
                spreadsheet.Sheets['Data'].AP1.s = header_styles
                spreadsheet.Sheets['Data'].AQ1.s = header_styles
                spreadsheet.Sheets['Data'].AR1.s = header_styles
                spreadsheet.Sheets['Data'].AS1.s = header_styles
                spreadsheet.Sheets['Data'].AT1.s = header_styles
                spreadsheet.Sheets['Data'].AU1.s = header_styles
                spreadsheet.Sheets['Data'].AV1.s = header_styles
                spreadsheet.Sheets['Data'].AW1.s = header_styles
                spreadsheet.Sheets['Data'].AX1.s = header_styles
                spreadsheet.Sheets['Data'].AY1.s = header_styles
                spreadsheet.Sheets['Data'].AZ1.s = header_styles
                spreadsheet.Sheets['Data'].BA1.s = header_styles
                spreadsheet.Sheets['Data'].BB1.s = header_styles
                spreadsheet.Sheets['Data'].BC1.s = header_styles
                spreadsheet.Sheets['Data'].BD1.s = header_styles
                spreadsheet.Sheets['Data'].BE1.s = header_styles
                spreadsheet.Sheets['Data'].BF1.s = header_styles
                spreadsheet.Sheets['Data'].BG1.s = header_styles
                spreadsheet.Sheets['Data'].BH1.s = header_styles
                //spreadsheet.Sheets['Data'].BI1.s = header_styles
                //spreadsheet.Sheets['Data'].BJ1.s = header_styles
                XLSX.writeFile(spreadsheet, 'Upload_FI_template.xlsx')
                MessageToast.show("Template File Downloading...")
            }
        });
    });
