﻿var SettingsPage = {


  initialize: function () {
    console.log("SettingsPage.initialize");
    this.refreshNotifications();
    this.populateFormSettings();
    this.expandTabs();
    // if blank values, highlight in red
    this.highlightMissingRecommended();
  },


  onDeviceReady: function() {
    console.log("SettingsPage.onDeviceReady");
    // avoid seeing the collapsed tabs on the first page transition
    this.expandTabs();

    // click listeners
    $("#checkbox_smell_notifications").click(SettingsPage.onToggleSmellNotifications);
    $("#checkbox_pghaqi_notifications").click(SettingsPage.onTogglePittsburghAqiNotifications);
    // change (text) listeners
    $("#textfield_email").change(SettingsPage.onEmailChange);
    $("#textfield_name").change(SettingsPage.onNameChange);
    $("#textfield_phone").change(SettingsPage.onPhoneChange);
    $("#textfield_address").change(SettingsPage.onAddressChange);
    // focus (textbox) listeners
    $("#textfield_email").focus(function(){SettingsPage.onFocusTextbox(this)});
    $("#textfield_name").focus(function(){SettingsPage.onFocusTextbox(this)});
    $("#textfield_phone").focus(function(){SettingsPage.onFocusTextbox(this)});
    $("#textfield_address").focus(function(){SettingsPage.onFocusTextbox(this)});
  },


  // helper functions


  refreshNotifications: function() {
    // enable smell notifications checkbox
    if (LocalStorage.get("receive_smell_notifications")) {
      $("#checkbox_smell_notifications").prop("checked", true).checkboxradio("refresh");
    } else {
      $("#checkbox_smell_notifications").prop("checked", false).checkboxradio("refresh");
    }

    // pittsburgh aqi notifications checkbox
    $("#checkbox_pghaqi_notifications").prop("checked", LocalStorage.get("receive_pghaqi_notifications")).checkboxradio("refresh");
  },


  populateFormSettings: function() {
    $("#textfield_email").prop("value", LocalStorage.get("email"));
    $("#textfield_name").prop("value", LocalStorage.get("name"));
    $("#textfield_phone").prop("value", LocalStorage.get("phone"));
    $("#textfield_address").prop("value", LocalStorage.get("address"));
  },


  expandTabs: function() {
    $("#notificationsCollapsible").collapsible({collapsed: false});
    $("#reportsCollapsible").collapsible({collapsed: false});
  },


  validateEmail: function(email) {
    // TODO double-check if this is a valid regex?
    var regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\ ".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  },


  highlightMissingRecommended: function() {
    // name
    if (LocalStorage.get("name") == "") {
      $("#textfield_name").parent().addClass("missing-recommended");
    } else {
      $("#textfield_name").parent().removeClass("missing-recommended");
    }
    // email
    if (LocalStorage.get("email") == "") {
      $("#textfield_email").parent().addClass("missing-recommended");
    } else {
      $("#textfield_email").parent().removeClass("missing-recommended");
    }
  },


  // callbacks


  onToggleSmellNotifications: function() {
    var topicName = Constants.SMELL_REPORT_TOPIC;

    if (LocalStorage.get("receive_smell_notifications")) {
      LocalStorage.set("receive_smell_notifications",false);
      window.FirebasePlugin.unsubscribe(topicName);
      console.log("unsubscribed from "+topicName);
      Analytics.logOnUnsubscribeEvent(topicName);
    } else {
      LocalStorage.set("receive_smell_notifications",true);
      window.FirebasePlugin.subscribe(topicName);
      console.log("subscribed to "+topicName);
      Analytics.logOnSubscribeEvent(topicName);
    }
  },


  onTogglePittsburghAqiNotifications: function() {
    var topicName = Constants.PITTSBURGH_AQI_TOPIC;

    if (LocalStorage.get("receive_pghaqi_notifications")) {
      LocalStorage.set("receive_pghaqi_notifications",false);
      window.FirebasePlugin.unsubscribe(topicName);
      console.log("unsubscribed from "+topicName);
      Analytics.logOnUnsubscribeEvent(topicName);
    } else {
      LocalStorage.set("receive_pghaqi_notifications",true);
      window.FirebasePlugin.subscribe(topicName);
      console.log("subscribed to "+topicName);
      Analytics.logOnSubscribeEvent(topicName);
    }
  },


  onEmailChange: function (event) {
    if (SettingsPage.validateEmail(this.value) || this.value == "") {
      LocalStorage.set("email",this.value);
    } else {
      this.value = LocalStorage.get("email");
      alert("Enter a valid email address.", null, "Invalid Email Entry", "Ok");
    }
    SettingsPage.highlightMissingRecommended();
  },


  onNameChange: function(event) {
    LocalStorage.set("name",this.value);
    SettingsPage.highlightMissingRecommended();
  },


  onPhoneChange: function (event) {
    LocalStorage.set("phone",this.value);
  },


  onAddressChange: function(event) {
    LocalStorage.set("address",this.value);
  },


  onFocusTextbox: function(element) {
    App.htmlElementToScrollAfterKeyboard = element;
    App.htmlElementToBlurAfterKeyboardCloses = element;
    element.scrollIntoView();
  }

}
