const CONFIG = {}; // Make this global to use all over the application

CONFIG.app = "development"; //production or development
CONFIG.port = "4444";

if (CONFIG.app === "production") {
  // TODO
} else if (CONFIG.app === "development") {
  CONFIG.db_dialect = "postgres";
  CONFIG.db_host = "localhost";
  CONFIG.db_port = "5432";
  CONFIG.db_name = "ordering_api";
  CONFIG.db_user = "postgres";
  CONFIG.db_password = "9334";
  CONFIG.jwt_encryption = "jwt_please_change";
}

module.exports = CONFIG;
