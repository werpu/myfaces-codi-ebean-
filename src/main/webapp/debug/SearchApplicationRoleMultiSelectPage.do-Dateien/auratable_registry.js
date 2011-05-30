/**
 * A registry of DataTables declared on a page. Access to each DataTable
 * is via its unique id.
 */
var AuraTableRegistry = (function() { 
	var map = {};
  
	return {
		get: function(id) {
			return map[id];
		},
		put: function(id, table) {
			map[id] = table;
		}
	};
})();