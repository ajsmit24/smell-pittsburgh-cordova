var Constants = {

  CLIENT_ID: "KEEP-IT-SECRET",
  LOCATION_SERVICES: false,
  PLATFORM_CALLBACK_ONREADY: false,
  SUBMIT_TO_ACHD: true,
  APP_VERSION: "2.1.0",
  URL_SMELLPGH: "http://localhost",

  // Page Ids
  STARTUP_PAGE: "startup",
  HOME_PAGE: "home",
  MAP_PAGE: "map",
  SETTINGS_PAGE: "settings",
  ABOUT_PAGE: "about",
  LOCATION_SELECT_PAGE: "locationselect",

  // Local Storage keys
  USER_HASH_KEY: "user_hash",
  NOTIFICATION_ENABLED_KEY: "notification",
  SMELL_NOTIFICATION_ENABLED_KEY: "smell_notification",
  SMELLS_KEY: "smells",
  ACHD_ENABLED_KEY: "achd_enabled",
  EMAIL_KEY: "email",
  STARTUP_KEY: "startup",
  NAME_KEY: "name",
  PHONE_KEY: "phone",

  // Topic strings
  GLOBAL_TOPIC: "GlobalTopic",
  PITTSBURGH_AQI_TOPIC: "pghaqi",
  SMELL_REPORT_TOPIC: "SmellReports",

  // Location services enums
  AuthorizationEnum: {
    NOT_REQUESTED: "not requested",
    GRANTED: "granted",
    DENIED: "denied"
  },
  AccuracyEnum: {
    ENABLED: "enabled",
    DISABLED: "disabled"
  }

}
