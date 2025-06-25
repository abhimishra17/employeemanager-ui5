sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "employeemanager/model/formatter",
  "sap/ui/model/Sorter"
], function (Controller, JSONModel, MessageToast, formatter, Sorter) {
  "use strict";

  return Controller.extend("employeemanager.controller.App", {
    formatter: formatter,
    onInit: function () {
      var data = {
        employees: [
          { id: "1001", name: "Alice", department: "IT" },
          { id: "1002", name: "Bob", department: "HR" },
          { id: "1003", name: "Charlie", department: "Finance" }
        ]
      };
      var oModel = new JSONModel(data);
      this.getView().setModel(oModel);
      this._oModel = oModel;
      this._aEmployees = JSON.parse(JSON.stringify(data.employees));
    },
    onAdd: function () {
      const newId = Date.now().toString();
      this._aEmployees.push({ id: newId, name: "", department: "" });
      this._oModel.setProperty("/employees", this._aEmployees);
    },
    onSave: function () {
      MessageToast.show("Employee saved.");
    },
    onDelete: function (oEvent) {
      const oItem = oEvent.getSource().getParent().getParent();
      const oCtx = oItem.getBindingContext();
      const index = parseInt(oCtx.getPath().split("/")[2]);
      this._aEmployees.splice(index, 1);
      this._oModel.setProperty("/employees", this._aEmployees);
    },
    onSearch: function (oEvent) {
      const query = oEvent.getSource().getValue().toLowerCase();
      const filtered = this._aEmployees.filter(e => e.name.toLowerCase().includes(query));
      this._oModel.setProperty("/employees", filtered);
    },
    onFilter: function (oEvent) {
      const key = oEvent.getSource().getSelectedKey();
      const filtered = key ? this._aEmployees.filter(e => e.department === key) : this._aEmployees;
      this._oModel.setProperty("/employees", filtered);
    },
    onSort: function () {
      const oTable = this.byId("employeeTable");
      const oBinding = oTable.getBinding("items");
      const oSorter = new Sorter("name", false);
      oBinding.sort(oSorter);
    }
  });
});
